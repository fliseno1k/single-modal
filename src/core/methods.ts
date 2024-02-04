import { Loader, Model } from '../core';
import type { SingleModalProtectedAPI, ActionOptions, SingleModalState } from '../types';

const cantBeChanged = (options: ActionOptions) => {
	const { force } = options;
	const closable = Model.selector.get('closable');

	return !closable && !force;
};

const replaceView = (key: string, options: ActionOptions, outputTransformer: () => SingleModalState['output']) => {
	const view = Model.statics.$views.get().get(key);
	if (!view || cantBeChanged(options)) return false;

	const transaction = Model.startTransaction()
		.add('open', () => true)
		.add('closable', () => options.closable);

	const retrievedView = Loader.tryRetrieve(view);
	if (retrievedView) {
		transaction.add('output', (output) => outputTransformer()).commit();
		return;
	}

	transaction.add('loading', () => true).commit();

	Loader.load(view, (renderableView) =>
		transaction
			.add('output', (output) => outputTransformer())
			.add('loading', () => false)
			.commit(),
	);
};

const open = (key: string, options: ActionOptions = { closable: true, force: false }) => {
	replaceView(key, options, () => []);
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

const push: SingleModalProtectedAPI<[]>['push'] = (key: string, options: ActionOptions) => {
	replaceView(key, options, () => []);
	return true;
};

const replace: SingleModalProtectedAPI<[]>['replace'] = (key: string, options: ActionOptions) => {
	replaceView(key, options, () => []);
	return true;
};

const back: SingleModalProtectedAPI<[]>['back'] = (options: ActionOptions) => {
	if (!Model.selector.get('canNavigateBack') || cantBeChanged(options)) return false;

	Model.startTransaction().add('output', (output) => output.slice(0, -1));
	return true;
};

export const Methods = {
	open,
	close,
	push,
	replace,
	back,
};
