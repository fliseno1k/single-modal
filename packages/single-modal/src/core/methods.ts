import { FunctionComponent } from 'react';
import { Loader, Model } from './';
import { Scheduler, type Task } from './scheduler';
import type { ViewOpeningStrategy, SingleModalProtectedAPI, SingleModalPublicAPI, ComponentLoader } from '../types';

type OutputTransformer = <T>(a: T[], b: T) => T[];

const nextId = (
	(init: number) => () =>
		`${(init += 1)}`
)(0);

const priorityMap: Record<ViewOpeningStrategy, number> = {
	intime: 0,
	queued: 1,
};

const bindView = (view: FunctionComponent<unknown>, props: unknown) => {
	const binded = view.bind(this, props ?? {}) as FunctionComponent<unknown>;
	binded.displayName = view.displayName ?? nextId();
	return binded;
};

const requestViewMutation = <Props>(
	loader: ComponentLoader<Props>,
	props: Props,
	outputTransformer: OutputTransformer,
) => {
	const tx = Model.startTransaction().stage(() => ({
		isOpen: true,
	}));

	const retrievedView = Loader.retrieve(loader as ComponentLoader<unknown>);

	if (retrievedView) {
		tx.stage((state) =>
			((output) => ({
				output,
				canNavigateBack: output.length > 1,
			}))(outputTransformer(state.output, bindView(retrievedView, props))),
		).commit();
		return;
	}

	tx.stage(() => ({ loading: true })).commit();

	Loader.load(loader as ComponentLoader<unknown>, (view) => {
		tx.stage((state) =>
			((output) => ({
				output,
				loading: false,
				canNavigateBack: output.length > 1,
			}))(outputTransformer(state.output, bindView(view, props))),
		).commit();
	});
};

const open: SingleModalPublicAPI['open'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const task: Task = {
		order: priorityMap.intime,
		fn: () => requestViewMutation(loader, props, (_, next) => [next]),
	};

	Scheduler.enqueueTask(task);
	Scheduler.flushWork();
};

const schedule: SingleModalPublicAPI['schedule'] = <T>(loader: ComponentLoader<T>, props: T) => {
	const task: Task = {
		order: priorityMap.queued,
		fn: () => requestViewMutation(loader, props, (_, next) => [next]),
	};

	const wasEmpty = Scheduler.isEmpty();
	Scheduler.enqueueTask(task);

	if (wasEmpty && !Model.select('isOpen')) {
		Scheduler.flushWork();
	}
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
	requestViewMutation(loader, props, (acc, next) => [...acc, next]);
};

const replace: SingleModalProtectedAPI['replace'] = <T>(loader: ComponentLoader<T>, props: T) => {
	requestViewMutation(loader, props, (views, next) => views.slice(0, -1).concat(next));
};

const back: SingleModalProtectedAPI['back'] = () => {
	if (!Model.select('canNavigateBack')) return;

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
	schedule,
	push,
	back,
	close,
	replace,
};
