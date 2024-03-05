import { ComponentType } from 'react';
import { Loader, Model } from './';
import { Scheduler, type Task } from './scheduler';

import type { ViewOpeningStrategy, SingleModalProtectedAPI, SingleModalGlobalAPI, ComponentLoader } from '../types';

type Method = 'OPEN' | 'PUSH' | 'REPLACE';
type OutputTransformer = <T>(a: T[], b: T) => T[];

let id = 0;
const nextId = () => (id += 1);

const priorityMap: Record<ViewOpeningStrategy, number> = {
	intime: 0,
	queued: 1,
};

const bindView = (view: ComponentType, props: unknown) => {
	// @ts-ignorel
	const binded = view.bind(this, props ?? {});
	binded.displayName = view.displayName || nextId();
	return binded;
};

function requestViewMutation<Props>(
	loader: ComponentLoader<Props>,
	props: Props,
	options: {
		method: Method;
		outputTransformer: OutputTransformer;
	},
) {
	const { method, outputTransformer } = options;

	const tx = Model.startTransaction().stage(() => ({
		isOpen: true,
		canNavigateBack: method === 'PUSH',
	}));

	const retrievedView = Loader.retrieve(loader);

	if (retrievedView) {
		tx.stage((state) => ({
			output: outputTransformer(state.output, bindView(retrievedView, props)),
		})).commit();
		return;
	}

	tx.stage(() => ({ loading: true })).commit();

	Loader.load(loader, (view) => {
		tx.stage((state) => ({
			loading: false,
			output: outputTransformer(state.output, bindView(view, props)),
		})).commit();
	});
}

const open: SingleModalGlobalAPI['open'] = <T>(loader: ComponentLoader<T>, props: T) => {
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

const close: SingleModalGlobalAPI['close'] = () => {
	if (!Model.select('isOpen') || !Scheduler.isEmpty()) {
		Scheduler.flushWork();
		return false;
	}

	Model.startTransaction()
		.stage(() => ({
			output: [],
			isOpen: false,
			canNavigateBack: false,
		}))
		.commit();
};

export const Methods = {
	open,
	push,
	back,
	close,
	replace,
};
