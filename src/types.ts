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
	views: ComponentType[];
}

export interface RendererProps {
	views: { key: string; view: ComponentType }[];
}

export interface SingleModalAPI<Options extends SingleModalOptions> {
	Component: ComponentType;
	usePublicApi<const Views extends Options['views']>(): SingleModalPublicAPI<Views>;
	useProtectedApi(): SingleModalProtectedAPI<Options['views']>;
}

export interface SingleModalPublicAPI<Views extends SingleModalOptions['views']> {
	isOpen: boolean;
	open<const Key extends keyof Views>(
		view: Key,
		props: Parameters<Views[Key]['contract']>[0],
		options?: ActionOptions,
	): boolean;
	close(options?: ActionOptions): boolean;
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
	back?: (options: ActionOptions) => void;
}

export interface SingleModalPrivateAPI {
	isOpen: boolean;
	views: ComponentType[];
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

export type LoadedComponent<Props> = ComponentType<Props> | { default: ComponentType<Props>; __esModule: true };
