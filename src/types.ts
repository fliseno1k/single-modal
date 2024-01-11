import type { ComponentType, PropsWithChildren } from 'react';

export interface SingleModalOptions {
	views: readonly SingleModalView[];
	modal: ComponentType<ModalProps>;
	loader: ComponentType;
}

export interface ModalProps extends PropsWithChildren {
	open: boolean;
}

export interface RendererProps {
	views: { key: string; view: ComponentType }[];
}

export interface SingleModalAPI<Options extends SingleModalOptions> {
	usePublicApi(): SingleModalPublicAPI<Options['views']>;
	useProtectedApi(): void;
	Component: unknown;
}

export interface SingleModalPublicAPI<Views extends SingleModalOptions['views']> {
	isOpen: boolean;
	open<const T extends Views>(view: T[number]['key']): boolean;
	close(options: { force: boolean }): boolean;
}

export interface SingleModalView<Props = unknown> {
	key: string;
	loader(): ComponentLoader<Props>;
	props: Props;
	/*
		push like de/serialization methods for saving
		intermidiate state and be available to restore iton request.
		maybe better to call it like a cache
	*/
}

export type ComponentLoader<Props> = Promise<LoadedComponent<Props>>;

export type LoadedComponent<Props> = ComponentType<Props> | { default: ComponentType<Props> };
