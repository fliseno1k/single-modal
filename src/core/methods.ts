import { ComponentType } from 'react';
import { Loader, Model } from '../core';
import type { ActionOptions } from '../types';

type Method = 'OPEN' | 'PUSH' | 'REPLACE';

const placeholderActionOptions: ActionOptions = {
	closable: true,
	force: false,
};

const cantBeChanged = (options: ActionOptions) => {
	const { force } = options;
	const closable = Model.selector.get('closable');

	return !closable && !force;
};

const bindView = (key: string, view: ComponentType, props: unknown) => {
	const binded = view.bind(this, props ?? {});
	binded.displayName = view.displayName || key;

	return binded;
};

const replaceView = (
	method: Method,
	key: string,
	options: ActionOptions,
	outputTransformer: (current: ComponentType[], next: ComponentType) => ComponentType[],
) => {
	const view = Model.statics.$views.get().get(key);
	if (!view || cantBeChanged(options)) return false;

	const transaction = Model.startTransaction()
		.add('open', () => true)
		.add('closable', () => options.closable)
		.add('canNavigateBack', () => method === 'PUSH');

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
	replaceView('OPEN', key, options, (_, next) => [bindView(key, next, props)]);
	return true;
};

const close = (options: ActionOptions = placeholderActionOptions) => {
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
	replaceView('PUSH', key, options, (acc, next) => [...acc, bindView(key, next, props)]);
	return true;
};

const replace = (key: string, props: unknown, options: ActionOptions = placeholderActionOptions) => {
	replaceView('REPLACE', key, options, (views, next) => views.slice(0, -1).concat(bindView(key, next, props)));
	return true;
};

const back = (options: ActionOptions = placeholderActionOptions) => {
	if (!Model.selector.get('canNavigateBack') || cantBeChanged(options)) return false;
	Model.startTransaction()
		.add('output', (output) => output.slice(0, -1))
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
