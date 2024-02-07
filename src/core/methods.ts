import { ComponentType } from 'react';
import { Loader, Model } from '../core';
import type { ActionOptions, SingleModalOutputView } from '../types';

const placeholderActionOptions: ActionOptions = {
	closable: true,
	force: false,
};

const cantBeChanged = (options: ActionOptions) => {
	const { force } = options;
	const closable = Model.selector.get('closable');

	return !closable && !force;
};

const replaceView = (
	key: string,
	options: ActionOptions,
	outputTransformer: (current: SingleModalOutputView[], next: ComponentType) => SingleModalOutputView[],
) => {
	const view = Model.statics.$views.get().get(key);
	if (!view || cantBeChanged(options)) return false;

	const transaction = Model.startTransaction()
		.add('open', () => true)
		.add('closable', () => options.closable);

	const retrievedView = Loader.tryRetrieve(view);

	if (retrievedView) {
		transaction.add('output', (output) => outputTransformer(output, retrievedView)).commit();
		return;
	}

	transaction.add('loading', () => true).commit();

	Loader.load(view, (renderableView) => {
		transaction
			.add('output', (output) => outputTransformer(output, renderableView))
			.add('loading', () => false)
			.commit();
	});
};

const open = (key: string, props: unknown, options: ActionOptions = placeholderActionOptions) => {
	replaceView(key, options, (acc, cur) => {
		const inactive = acc.map((view) => {
			view.active = false;
			return view;
		});
		const view = { key, active: true, component: cur.bind({}, props ?? {}) };
		return [...inactive, view];
	});
	return true;
};

const close = (options: ActionOptions) => {
	if (!Model.selector.get('open') || cantBeChanged(options)) {
		return false;
	}

	Model.startTransaction()
		.add('open', () => false)
		.add('output', () => [])
		.add('canNavigateBack', () => false)
		.add('closable', () => true)
		.commit();

	return true;
};

const push = (key: string, props: unknown, options: ActionOptions = placeholderActionOptions) => {
	replaceView(key, options, (acc, cur) => {
		const inactive = acc.map((view) => {
			view.active = false;
			return view;
		});

		const view = { key, active: true, component: cur.bind({}, props ?? {}) };
		return [...inactive, view];
	});
	return true;
};

const replace = (key: string, props: unknown, options: ActionOptions = placeholderActionOptions) => {
	replaceView(key, options, (acc, cur) => {
		const inactive = acc.map((view) => {
			view.active = false;
			return view;
		});
		const view = { key, active: true, component: cur.bind({}, props ?? {}) };
		const views = [...inactive.slice(0, -1), view];

		if (inactive.length > 1) {
			views.push(inactive[inactive.length - 1]);
		}

		return views;
	});
	return true;

	replaceView(key, options, (views, next) => views.slice(0, -1).concat(next));
	return true;
};

const back = (options: ActionOptions = placeholderActionOptions) => {
	if (!Model.selector.get('canNavigateBack') || cantBeChanged(options)) return false;

	Model.startTransaction().add('output', (output) => {
		const updated = output.map((view) => {
			view.active = false;
			return view;
		});

		updated[updated.length - 2].active = true;
		return updated;
	});
	return true;
};

export const Methods = {
	open,
	push,
	back,
	close,
	replace,
};
