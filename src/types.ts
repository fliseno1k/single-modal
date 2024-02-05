import type { ComponentType, PropsWithChildren } from 'react';

export interface SingleModalOptions {
	views: readonly SingleModalView[];
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
	open<const T extends Views>(view: T[number]['key'], options?: ActionOptions): boolean;
	close(options?: ActionOptions): boolean;
}

export interface SingleModalProtectedAPI<Views extends SingleModalOptions['views']> {
	closable: boolean;
	push<const T extends Views>(view: T[number]['key'], options?: ActionOptions): boolean;
	replace<const T extends Views>(view: T[number]['key'], options?: ActionOptions): boolean;
	back?: (options: ActionOptions) => void;
}

export interface SingleModalPrivateAPI {
	isOpen: boolean;
	views: ComponentType[];
	Inserted: ComponentType<ModalProps>;
}

export interface SingleModalView<Props = unknown> {
	key: string;
	contract: (props: Props) => void;
	loader(): ComponentLoader<Props>;
}

export type ActionOptions = {
	force: boolean;
	closable: boolean;
	/* view modal switch strategy
		strategy: 'force' | 'queue' | 'try';
	*/
};

export type ComponentLoader<Props> = Promise<LoadedComponent<Props>>;

export type LoadedComponent<Props> = ComponentType<Props> | { default: ComponentType<Props>; __esModule: true };
