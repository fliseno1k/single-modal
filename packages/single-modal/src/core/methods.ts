import { FunctionComponent } from 'react';
import { Loader, Model } from './';
import { Scheduler, type Task } from './scheduler';
import type { SingleModalProtectedAPI, SingleModalPublicAPI, ComponentLoader } from '../types';

type OutputTransformer = <T>(a: T[], b: T) => T[];

const nextId = (
	(val: number) => () =>
		`${(val += 1)}`
)(0);

let currentTaskId = nextId();

const comparator = (val: string) => () => val >= currentTaskId;

const bindView = (view: FunctionComponent<unknown>, props: unknown) => {
	const binded = view.bind(this, props ?? {}) as FunctionComponent<unknown>;
	binded.displayName = view.displayName ?? nextId();
	return binded;
};

const mutate = <Props>(
	loader: ComponentLoader<Props>,
	props: Props,
	outputTransformer: OutputTransformer,
	isStillRelevant: () => boolean,
) => {
	const tx = Model.startTransaction().stage(() => ({
		isOpen: true,
	}));

	const retrievedView = Loader.retrieve(loader as ComponentLoader<unknown>);
	if (retrievedView) {
		return completeTx(retrievedView);
	}

	tx.stage(() => ({ loading: true })).commit();
	Loader.load(loader as ComponentLoader<unknown>, (view) => completeTx(view));

	function completeTx(view: FunctionComponent<unknown>) {
		if (!isStillRelevant()) return;

		tx.stage((state) =>
			((output) => ({
				output,
				loading: false,
				canNavigateBack: output.length > 1,
			}))(outputTransformer(state.output, bindView(view, props))),
		).commit();
	}
};

const open: SingleModalPublicAPI['open'] = <T>(loader: ComponentLoader<T>, props: T) => {
	mutate(loader, props, (_, next) => [next], comparator((currentTaskId = nextId())));
};

const softOpen: SingleModalPublicAPI['softOpen'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const task: Task = () =>
		mutate(
			loader,
			props,
			(_, next) => [next],
			() => true,
		);

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

	Model.startTransaction()
		.stage(() => ({
			output: [],
			isOpen: false,
			canNavigateBack: false,
		}))
		.commit();
};

const push: SingleModalProtectedAPI['push'] = <T>(loader: ComponentLoader<T>, props: T) => {
	mutate(loader, props, (acc, next) => acc.concat([next]), comparator((currentTaskId = nextId())));
};

const replace: SingleModalProtectedAPI['replace'] = <T>(loader: ComponentLoader<T>, props: T) => {
	mutate(loader, props, (views, next) => views.slice(0, -1).concat(next), comparator((currentTaskId = nextId())));
};

const back: SingleModalProtectedAPI['back'] = () => {
	Model.startTransaction()
		.stage((state) =>
			((output) => ({
				output,
				canNavigateBack: output.length > 1,
			}))(state.output.slice(0, -1)),
		)
		.commit();
};

export const Methods = {
	open,
	softOpen,
	push,
	back,
	close,
	replace,
};
