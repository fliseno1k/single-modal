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
	useProtectedApi(): SingleModalProtectedAPI<Options['views']>;
	Component: unknown;
}

export interface SingleModalPublicAPI<Views extends SingleModalOptions['views']> {
	isOpen: boolean;
	open<const T extends Views>(view: T[number]['key'], options: ActionOptions): boolean;
	close(options: ActionOptions): boolean;
}

export interface SingleModalProtectedAPI<Views extends SingleModalOptions['views']> {
	isClosable: boolean;
	setClosable(value: boolean): boolean;
	push<const T extends Views>(view: T[number]['key'], options: ActionOptions): boolean;
	replace<const T extends Views>(view: T[number]['key'], options: ActionOptions): boolean;
	back?: (options: ActionOptions) => void;

	/*
		Add like de/serialization methods to cache
		intermidiate state and be available to restore it
		on next view mount in a single router (internal) lifecycle (before history clean).

		serialize(obj: any): boolean:
		deserialize(view): ViewProps | undefined;
	*/
}

export interface SingleModalView<Props = unknown> {
	key: string;
	loader(): ComponentLoader<Props>;
}

export type ActionOptions = {
	force: boolean;
	closable: boolean;
};

export type ComponentLoader<Props> = Promise<LoadedComponent<Props>>;

export type LoadedComponent<Props> = ComponentType<Props> | { default: ComponentType<Props>; __esModule: true };
