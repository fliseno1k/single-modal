import { LoaderController, ModalStateController, RouterController } from '../core';
import { toNonNullable } from '../utils';
import type { SingleModalPublicAPI, SingleModalProtectedAPI, SharedRoutingOptions } from '../types';

const open: SingleModalPublicAPI<[]>['open'] = (viewKey: string) => {
	const view = ModalStateController.getView(viewKey);
	if (!view) return false;

	ModalStateController.open();
	RouterController.replace(view);
	LoaderController.load(view, (renderableView) => ModalStateController.outputView(renderableView));

	return true;
};

const close: SingleModalPublicAPI<[]>['close'] = (options) => {
	const { force } = options;

	if (force) {
		return true;
	}

	ModalStateController.close();
	RouterController.reset();

	return true;
};

const push: SingleModalProtectedAPI<[]>['push'] = (viewKey: string, options: SharedRoutingOptions) => {
	const view = ModalStateController.getView(viewKey);
	if (!view) return false;

	RouterController.push(view);
	LoaderController.load(view, (renderableView) => ModalStateController.outputView(renderableView));

	return true;
};

const replace: SingleModalProtectedAPI<[]>['replace'] = (viewKey: string, options: SharedRoutingOptions) => {
	const view = ModalStateController.getView(viewKey);
	if (!view) return false;

	RouterController.replace(view);
	LoaderController.load(view, (renderableView) => ModalStateController.outputView(renderableView));

	return true;
};

const back: SingleModalProtectedAPI<[]>['back'] = (options: SharedRoutingOptions) => {
	if (!RouterController.$canGoBack.get()) return false;

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
