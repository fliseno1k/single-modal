import { useStore } from '@nanostores/react';
import { ModalStateController } from '../core';
import type { SingleModalPrivateAPI } from '../types';

export function usePrivateApi(): SingleModalPrivateAPI {
	const UserModal = useStore(ModalStateController.$options).modal;
	const isOpen = useStore(ModalStateController.$open);
	const views = useStore(ModalStateController.$output);

	return { isOpen, views, Inserted: UserModal };
}
