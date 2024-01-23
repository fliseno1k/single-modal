import { LoaderController, ModalStateController, RouterController } from '../core';
import { toNonNullable } from '../utils';
import type { SingleModalProtectedAPI, ActionOptions } from '../types';

const cantBeChanged = (options: ActionOptions) => {
	const { force } = options;
	const closable = ModalStateController.$closable.get();

	return !closable && !force;
};

const open = (viewKey: string, options: ActionOptions) => {
	const view = ModalStateController.getView(viewKey);
	if (!view || cantBeChanged(options)) return false;

	ModalStateController.open();
	ModalStateController.setClosable(options.closable ?? true);

	RouterController.replace(view);
	LoaderController.load(view, (renderableView) => ModalStateController.outputView(renderableView));

	return true;
};

const close = (options: ActionOptions) => {
	if (cantBeChanged(options)) {
		return false;
	}

	ModalStateController.close();
	ModalStateController.clearOutput();
	RouterController.reset();

	return true;
};

const push: SingleModalProtectedAPI<[]>['push'] = (viewKey: string, options: ActionOptions) => {
	const view = ModalStateController.getView(viewKey);
	if (!view || cantBeChanged(options)) return false;

	RouterController.push(view);
	LoaderController.load(view, (renderableView) => ModalStateController.outputView(renderableView));

	return true;
};

const replace: SingleModalProtectedAPI<[]>['replace'] = (viewKey: string, options: ActionOptions) => {
	const view = ModalStateController.getView(viewKey);
	if (!view || cantBeChanged(options)) return false;

	RouterController.replace(view);
	LoaderController.load(view, (renderableView) => ModalStateController.outputView(renderableView));

	return true;
};

const back: SingleModalProtectedAPI<[]>['back'] = (options: ActionOptions) => {
	if (!RouterController.$canGoBack.get() || cantBeChanged(options)) return false;

	ModalStateController.open();
	RouterController.back();
	const view = toNonNullable(RouterController.$state.get().view);
	LoaderController.load(view, (renderable) => {
		ModalStateController.outputView(renderable);
	});

	return true;
};

export const Mediator = {
	open,
	close,
	push,
	replace,
	back,
};
