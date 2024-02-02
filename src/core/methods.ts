import { LoaderController, Model } from '../core';
import { toNonNullable } from '../utils';
import type { SingleModalProtectedAPI, ActionOptions } from '../types';

const cantBeChanged = (options: ActionOptions) => {
	const { force } = options;
	const closable = Model.selector.get('closable');

	return !closable && !force;
};

const open = (viewKey: string, options: ActionOptions = { closable: true, force: false }) => {
	const view = Model.statics.$views.get().get(viewKey);
	if (!view || cantBeChanged(options)) return false;

	const transaction = Model.startTransaction()
		.add('open', () => true)
		.add('closable', () => options.closable);

	const retrievedView = LoaderController.tryRetrieve(view);
	if (retrievedView) {
		transaction.add('output', (output) => [...output, retrievedView]).commit();
	} else {
		transaction.commit();

		LoaderController.load(view, (renderableView) =>
			transaction.add('output', (output) => [...output, renderableView]).commit(),
		);
	}

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

const push: SingleModalProtectedAPI<[]>['push'] = (viewKey: string, options: ActionOptions) => {
	const view = Model.statics.$views.get().get(viewKey);
	if (!view || cantBeChanged(options)) {
		return false;
	}

	LoaderController.load(view, (renderableView) =>
		Model.startTransaction()
			.add('output', (output) => [...output, renderableView])
			.commit(),
	);

	return true;
};

const replace: SingleModalProtectedAPI<[]>['replace'] = (viewKey: string, options: ActionOptions) => {
	const view = Model.statics.$views.get().get(viewKey);
	if (!view || cantBeChanged(options)) return false;

	LoaderController.load(view, (renderableView) =>
		Model.startTransaction()
			.add('output', (output) => [...output, renderableView])
			.commit(),
	);

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
