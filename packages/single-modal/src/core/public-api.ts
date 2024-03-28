import { Model } from './model';
import { Methods } from './methods';
import type { SingleModalAPI } from '..';

function isAnyOpen(): boolean {
	return Model._subscriber.get().isOpen;
}

export const publicAPI: SingleModalAPI['publicAPI'] = {
	isAnyOpen,
	open: Methods.open,
	delay: Methods.delay,
	close: Methods.close,
};
