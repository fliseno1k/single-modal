import { ComponentType } from 'react';
import { Loader, Model } from './';
import type { ViewOpeningStrategy } from '../types';
import { Scheduler, type Task } from './scheduler';

type Method = 'OPEN' | 'PUSH' | 'REPLACE';

const priorityMap: Record<ViewOpeningStrategy, number> = {
	intime: 0,
	queued: 1,
};

const bindView = (key: string, view: ComponentType, props: unknown) => {
	// @ts-ignore
	const binded = view.bind(this, props ?? {});
	binded.displayName = view.displayName || key;

	return binded;
};

const requestViewMutation = (
	method: Method,
	key: string,
	transformOutput: (current: ComponentType[], next: ComponentType) => ComponentType[],
) => {
	const view = Model.statics.$views.get().get(key);
	if (!view) return false;

	const tx = Model.startTransaction().stage(() => ({
		open: true,
		canNavigateBack: method === 'PUSH',
	}));
	const retrievedView = Loader.retrieve(view);

	if (retrievedView) {
		tx.stage((state) => ({
			output: transformOutput(state.output, retrievedView),
		})).commit();
		return;
	}

	tx.stage(() => ({ loading: true })).commit();

	Loader.load(view, (renderableView) => {
		tx.stage((state) => ({
			output: transformOutput(state.output, renderableView),
			loading: false,
		})).commit();
	});
};

const open = (key: string, strategy: ViewOpeningStrategy = 'intime', props: unknown) => {
	const task: Task = {
		order: priorityMap[strategy],
		fn: () => requestViewMutation('OPEN', key, (_, next) => [bindView(key, next, props)]),
	};

	Scheduler.enqueueTask(task);
	if (!Model.select('open') || strategy === 'intime') {
		Scheduler.flushWork();
	}

	return true;
};

const push = (key: string, props: unknown) => {
	requestViewMutation('PUSH', key, (acc, next) => [...acc, bindView(key, next, props)]);
	return true;
};

const replace = (key: string, props: unknown) => {
	requestViewMutation('REPLACE', key, (views, next) => views.slice(0, -1).concat(bindView(key, next, props)));
	return true;
};

const back = () => {
	if (!Model.select('canNavigateBack')) return false;

	Model.startTransaction()
		.stage((state) => ({ output: state.output.slice(0, -1) }))
		.commit();

	return true;
};

const close = () => {
	if (!Model.select('open') || !Scheduler.isEmpty()) {
		Scheduler.flushWork();
		return false;
	}

	Model.startTransaction()
		.stage(() => ({
			open: false,
			output: [],
			canNavigateBack: false,
		}))
		.commit();

	return true;
};

export const Methods = {
	open,
	push,
	back,
	close,
	replace,
};
