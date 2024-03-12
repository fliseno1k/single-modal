import { Methods, Model } from '.';
import type { SingleModalAPI } from '..';

function isAnyOpen(): boolean {
	return Model._subscriber.get().isOpen;
}

export const publicAPI: SingleModalAPI['publicAPI'] = {
	isAnyOpen,
	open: Methods.open,
	close: Methods.close,
	softOpen: Methods.softOpen,
};
