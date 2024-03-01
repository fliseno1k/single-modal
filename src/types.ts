import type { ComponentType, PropsWithChildren } from 'react';

export interface SingleModalOptions {
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	views: Record<string, SingleModalView<any>>;
	modal: ComponentType<ModalProps>;
}

export interface SingleModalState {
	open: boolean;
	loading: boolean;
	canNavigateBack: boolean;
	output: ComponentType[];
}

export interface ModalProps extends PropsWithChildren {
	open: boolean;
	loading: boolean;
	view?: ComponentType;
}

export interface SingleModalAPI<Options extends SingleModalOptions> {
	Component: ComponentType;
	usePublicApi(): SingleModalPublicAPI;
	useProtectedApi(): SingleModalProtectedAPI<Options['views']>;
	globalApi: SingleModalGlobalAPI<Options['views']>;
}

export interface SingleModalGlobalAPI<Views extends SingleModalOptions['views']> {
	open<const Key extends keyof Views>(
		view: Key,
		strategy: ViewOpeningStrategy,
		props?: Parameters<Views[Key]['contract']>[0],
	): boolean;
	close(): boolean;
}

export interface SingleModalPublicAPI {
	isOpen: boolean;
}

export interface SingleModalProtectedAPI<Views extends SingleModalOptions['views']> {
	push<const Key extends keyof Views>(view: Key, props?: Parameters<Views[Key]['contract']>[0]): boolean;
	replace<const Key extends keyof Views>(view: Key, props?: Parameters<Views[Key]['contract']>[0]): boolean;
	back?: () => void;
	close: () => void;
}

export interface SingleModalPrivateAPI {
	open: boolean;
	loading: boolean;
	canNavigateBack: boolean;
	view?: ComponentType;
	Inserted: ComponentType<ModalProps>;
}

export interface SingleModalView<T> {
	key: string;
	contract: (props: T) => void;
	loader(): ComponentLoader<T>;
}

export type ComponentLoader<Props = unknown> = Promise<LoadedComponent<Props>>;

export type LoadedComponent<Props> = { default: ComponentType<Props> };

export type ViewOpeningStrategy = 'intime' | 'queued';
