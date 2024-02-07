import type { ComponentType, PropsWithChildren } from 'react';

export interface SingleModalOptions {
	views: Record<string, SingleModalView<any>>;
	modal: ComponentType<ModalProps>;
}

export interface SingleModalState {
	open: boolean;
	loading: boolean;
	closable: boolean;
	canNavigateBack: boolean;
	output: ComponentType[];
}

export interface ModalProps extends PropsWithChildren {
	open: boolean;
	loading: boolean;
	view?: ComponentType;
}

export interface RendererProps {
	views: { key: string; view: ComponentType }[];
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
		props: Parameters<Views[Key]['contract']>[0],
		options?: ActionOptions,
	): boolean;
	close(options?: ActionOptions): boolean;
}

export interface SingleModalPublicAPI {
	isOpen: boolean;
}

export interface SingleModalProtectedAPI<Views extends SingleModalOptions['views']> {
	closable: boolean;
	push<const Key extends keyof Views>(
		view: Key,
		props: Parameters<Views[Key]['contract']>[0],
		options?: ActionOptions,
	): boolean;
	replace<const Key extends keyof Views>(
		view: Key,
		props: Parameters<Views[Key]['contract']>[0],
		options?: ActionOptions,
	): boolean;
	back?: (options?: ActionOptions) => void;
	close: (options?: ActionOptions) => void;
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

export type ActionOptions = {
	force: boolean;
	closable: boolean;
	/* view modal switch strategy
		strategy: 'force' | 'queue' | 'try';
	*/
};

export type ComponentLoader<Props = unknown> = Promise<LoadedComponent<Props>>;

export type LoadedComponent<Props> = { default: ComponentType<Props> };
