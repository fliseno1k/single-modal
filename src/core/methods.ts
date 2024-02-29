import { ComponentType } from 'react';
import { Loader, Model } from '../core';

type Method = 'OPEN' | 'PUSH' | 'REPLACE';

const bindView = (key: string, view: ComponentType, props: unknown) => {
	const binded = view.bind(this, props ?? {});
	binded.displayName = view.displayName || key;

	return binded;
};

const replaceView = (
	method: Method,
	key: string,
	outputTransformer: (current: ComponentType[], next: ComponentType) => ComponentType[],
) => {
	const view = Model.statics.$views.get().get(key);
	if (!view) return false;

	const transaction = Model.startTransaction()
		.add('open', () => true)
		.add('canNavigateBack', () => method === 'PUSH');

	const retrievedView = Loader.retrieve(view);

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

const open = (key: string, props: unknown) => {
	replaceView('OPEN', key, (_, next) => [bindView(key, next, props)]);
	return true;
};

const close = () => {
	if (!Model.select('open')) {
		return false;
	}

	Model.startTransaction()
		.add('open', () => false)
		.add('output', () => [])
		.add('canNavigateBack', () => false)
		.commit();

	return true;
};

const push = (key: string, props: unknown) => {
	replaceView('PUSH', key, (acc, next) => [...acc, bindView(key, next, props)]);
	return true;
};

const replace = (key: string, props: unknown) => {
	replaceView('REPLACE', key, (views, next) => views.slice(0, -1).concat(bindView(key, next, props)));
	return true;
};

const back = () => {
	if (!Model.select('canNavigateBack')) return false;

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
