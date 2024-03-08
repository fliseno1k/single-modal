import { FunctionComponent } from 'react';
import { Loader, Model } from './';
import { Scheduler, type Task } from './scheduler';
import type { ViewOpeningStrategy, SingleModalProtectedAPI, SingleModalPublicAPI, ComponentLoader } from '../types';

type Method = 'OPEN' | 'PUSH' | 'REPLACE';
type OutputTransformer = <T>(a: T[], b: T) => T[];

let id = 0;
const nextId = () => `${(id += 1)}`;

const priorityMap: Record<ViewOpeningStrategy, number> = {
	intime: 0,
	queued: 1,
};

const bindView = (view: FunctionComponent<unknown>, props: unknown) => {
	view.displayName = view.displayName ?? nextId();
	return view.bind(this, props ?? {});
};

const requestViewMutation = <Props>(
	loader: ComponentLoader<Props>,
	props: Props,
	options: {
		method: Method;
		outputTransformer: OutputTransformer;
	},
) => {
	const { method, outputTransformer } = options;

	const tx = Model.startTransaction().stage(() => ({
		isOpen: true,
		canNavigateBack: method === 'PUSH',
	}));

	const retrievedView = Loader.retrieve(loader as ComponentLoader<unknown>);

	if (retrievedView) {
		tx.stage((state) => ({
			output: outputTransformer(state.output, bindView(retrievedView, props)),
		})).commit();
		return;
	}

	tx.stage(() => ({ loading: true })).commit();

	Loader.load(loader as ComponentLoader<unknown>, (view) => {
		tx.stage((state) => ({
			loading: false,
			output: outputTransformer(state.output, bindView(view, props)),
		})).commit();
	});
};

const open: SingleModalPublicAPI['open'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const task: Task = {
		order: priorityMap.intime,
		fn: () =>
			requestViewMutation(loader, props, {
				method: 'OPEN',
				outputTransformer: (_, next) => [next],
			}),
	};

	Scheduler.enqueueTask(task);
	Scheduler.flushWork();
};

const schedule: SingleModalPublicAPI['schedule'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const task: Task = {
		order: priorityMap.queued,
		fn: () =>
			requestViewMutation(loader, props, {
				method: 'OPEN',
				outputTransformer: (_, next) => [next],
			}),
	};

	Scheduler.enqueueTask(task);
};

const close: SingleModalPublicAPI['close'] = () => {
	if (!Model.select('isOpen') || !Scheduler.isEmpty()) {
		Scheduler.flushWork();
		return;
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
	requestViewMutation(loader, props, {
		method: 'PUSH',
		outputTransformer: (acc, next) => [...acc, next],
	});
};

const replace: SingleModalProtectedAPI['replace'] = <T>(loader: ComponentLoader<T>, props: T) => {
	requestViewMutation(loader, props, {
		method: 'REPLACE',
		outputTransformer: (views, next) => views.slice(0, -1).concat(next),
	});
};

const back: SingleModalProtectedAPI['back'] = () => {
	if (!Model.select('canNavigateBack')) return;

	Model.startTransaction()
		.stage((state) => ({ output: state.output.slice(0, -1) }))
		.commit();
};

export const Methods = {
	open,
	schedule,
	push,
	back,
	close,
	replace,
};
