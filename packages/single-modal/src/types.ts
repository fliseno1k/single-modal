import type { FunctionComponent, PropsWithChildren } from 'react';

export interface SingleModalOptions {
	modal: FunctionComponent<ModalProps>;
}

export interface SingleModalState {
	isOpen: boolean;
	loading: boolean;
	canNavigateBack: boolean;
	output: FunctionComponent[];
}

export interface ModalProps extends PropsWithChildren {
	isOpen: boolean;
	loading: boolean;
	view?: FunctionComponent;
}

export interface SingleModalAPI {
	Component: FunctionComponent;
	publicAPI: SingleModalPublicAPI;
	useProtectedAPI(): SingleModalProtectedAPI;
}

export interface SingleModalPublicAPI {
	isAnyOpen(): boolean;
	open<Props>(loader: ComponentLoader<Props> | FunctionComponent<Props>, props: Props): void;
	schedule<Props>(loader: ComponentLoader<Props> | ComponentLoader<Props>, props: Props): void;
	close(): void;
}

export interface SingleModalProtectedAPI {
	push<Props>(loader: ComponentLoader<Props> | FunctionComponent<Props>, props: Props): void;
	replace<Props>(loader: ComponentLoader<Props> | FunctionComponent<Props>, props: Props): void;
	back?(): void;
}

export interface SingleModalPrivateAPI {
	isOpen: boolean;
	loading: boolean;
	canNavigateBack: boolean;
	view?: FunctionComponent;
	Inserted: FunctionComponent<ModalProps>;
}

export interface SingleModalView<T = unknown> {
	props: T;
	loader: ComponentLoader<T>;
}

export type ComponentLoader<Props = unknown> = () => Promise<LoadedComponent<Props>> | FunctionComponent<Props>;

export type LoadedComponent<Props> = { default: FunctionComponent<Props> };

export type ViewOpeningStrategy = 'intime' | 'queued';
