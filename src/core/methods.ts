import { ComponentType } from 'react';
import { Loader, Model } from '../core';
import type { ActionOptions } from '../types';

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
	outputTransformer: (current: ComponentType[], next: ComponentType) => ComponentType[],
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

const open = (key: string, options: ActionOptions = placeholderActionOptions) => {
	replaceView(key, options, (acc, cur) => [...acc, cur]);
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

const push = (key: string, options: ActionOptions = placeholderActionOptions) => {
	replaceView(key, options, () => []);
	return true;
};

const replace = (key: string, options: ActionOptions = placeholderActionOptions) => {
	replaceView(key, options, () => []);
	return true;
};

const back = (options: ActionOptions = placeholderActionOptions) => {
	if (!Model.selector.get('canNavigateBack') || cantBeChanged(options)) return false;

	Model.startTransaction().add('output', (output) => output.slice(0, -1));
	return true;
};

export const Methods = {
	open,
	push,
	back,
	close,
	replace,
};
