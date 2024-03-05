import type { ComponentType, PropsWithChildren } from 'react';

export interface SingleModalOptions {
	modal: ComponentType<ModalProps>;
}

export interface SingleModalState {
	isOpen: boolean;
	loading: boolean;
	canNavigateBack: boolean;
	output: ComponentType[];
}

export interface ModalProps extends PropsWithChildren {
	isOpen: boolean;
	loading: boolean;
	view?: ComponentType;
}

export interface SingleModalAPI {
	Component: ComponentType;
	usePublicApi(): SingleModalPublicAPI;
	useProtectedApi(): SingleModalProtectedAPI;
	globalApi: SingleModalGlobalAPI;
}

export interface SingleModalGlobalAPI {
	open<Props>(loader: ComponentLoader<Props> | ComponentType<Props>, props: Props): void;
	schedule<Props>(loader: ComponentLoader<Props> | ComponentLoader<Props>, props: Props): void;
	close(): void;
}

export interface SingleModalPublicAPI {
	isOpen: boolean;
}

export interface SingleModalProtectedAPI {
	push<Props>(loader: ComponentLoader<Props> | ComponentType<Props>, props: Props): void;
	replace<Props>(loader: ComponentLoader<Props> | ComponentType<Props>, props: Props): void;
	back?(): void;
}

export interface SingleModalPrivateAPI {
	isOpen: boolean;
	loading: boolean;
	canNavigateBack: boolean;
	view?: ComponentType;
	Inserted: ComponentType<ModalProps>;
}

export interface SingleModalView<T = unknown> {
	props: T;
	loader: ComponentLoader<T>;
}

export type ComponentLoader<Props = unknown> = () => Promise<LoadedComponent<Props>>;

export type LoadedComponent<Props> = { default: ComponentType<Props> };

export type ViewOpeningStrategy = 'intime' | 'queued';
