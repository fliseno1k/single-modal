import { FunctionComponent } from 'react';
import { Model } from './model';
import { Loader } from './loader';
import { Scheduler, type Task } from './scheduler';
import type { SingleModalProtectedAPI, SingleModalPublicAPI, ComponentLoader } from '../types';

type Transform = <T>(a: T[], b: T) => T[];

const nextId = order(-1);
let currentOrder = nextId();

const open: SingleModalPublicAPI['open'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const transform: Transform = (_, next) => [next];

	mutate(loader, props, transform, cmp((currentOrder = nextId())));
};

const delay: SingleModalPublicAPI['delay'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const transform: Transform = (_, next) => [next];
	const task: Task = () => mutate(loader, props, transform, () => true);

	const wasEmpty = Scheduler.isEmpty();
	Scheduler.enqueueTask(task);

	if (wasEmpty && !Model.select('isOpen')) {
		Scheduler.flushWork();
	}
};

const close: SingleModalPublicAPI['close'] = () => {
	if (!Scheduler.isEmpty()) {
		return Scheduler.flushWork();
	}

	Model.initTx()
		.stage(() => ({
			output: [],
			isOpen: false,
		}))
		.commit();
};

const push: SingleModalProtectedAPI['push'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const transform: Transform = (acc, next) => acc.concat([next]);

	mutate(loader, props, transform, cmp((currentOrder = nextId())));
};

const replace: SingleModalProtectedAPI['replace'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const transform: Transform = (views, next) => views.slice(0, -1).concat(next);

	mutate(loader, props, transform, cmp((currentOrder = nextId())));
};

const back: SingleModalProtectedAPI['back'] = () => {
	const tx = Model.initTx();

	if (tx.inspect().output.length < 2) {
		return close();
	}

	tx.stage((state) => {
		const output = state.output.slice(0, -1);
		return {
			output,
		};
	}).commit();
};

function mutate<Props>(
	loader: ComponentLoader<Props>,
	props: Props,
	outputTransformer: Transform,
	isTarget: () => boolean,
) {
	const tx = Model.initTx().stage(() => ({
		isOpen: true,
	}));

	const retrievedView = Loader.retrieve(loader as ComponentLoader<unknown>);
	if (retrievedView) {
		return completeTx(retrievedView);
	}

	tx.stage(() => ({ loading: true })).commit();
	Loader.load(loader as ComponentLoader<unknown>, (view) => () => completeTx(view));

	function completeTx(view: FunctionComponent<unknown>) {
		if (!isTarget()) {
			return;
		}

		tx.stage((state) => {
			const output = outputTransformer(state.output, bindView(view, props));
			return {
				loading: false,
				output,
			};
		}).commit();
	}
}

function bindView<T = unknown>(view: FunctionComponent<T>, props: T): FunctionComponent<T> {
	const binded = view.bind({}, props);
	view.displayName = view.displayName ?? nextId();

	return binded;
}

function order(val: number) {
	return () => `${(val += 1)}`;
}

function cmp(val: string) {
	return () => val >= currentOrder;
}

export const Methods = {
	open,
	delay,
	push,
	back,
	close,
	replace,
};
