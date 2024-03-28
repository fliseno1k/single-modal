import type { FunctionComponent, PropsWithChildren } from 'react';

export interface SingleModalOptions {
	renderer: FunctionComponent<ModalsRendererProps>;
}

export interface SingleModalState {
	isOpen: boolean;
	loading: boolean;
	output: FunctionComponent<unknown>[];
}

export interface ModalsRendererProps extends PropsWithChildren {
	isOpen: boolean;
	loading: boolean;
	view?: FunctionComponent<unknown>;
}

export interface SingleModalAPI {
	Component: FunctionComponent;
	publicAPI: SingleModalPublicAPI;
	useProtectedAPI(): SingleModalProtectedAPI;
}

export interface SingleModalPublicAPI {
	isAnyOpen(): boolean;
	open<Props>(loader: ComponentLoader<Props> | FunctionComponent<Props>, props: Props): void;
	delay<Props>(loader: ComponentLoader<Props> | ComponentLoader<Props>, props: Props): void;
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
	view?: FunctionComponent<unknown>;
	Inserted: FunctionComponent<ModalsRendererProps>;
}

export type ComponentLoader<Props = unknown> = () => Promise<FunctionComponent<Props>> | FunctionComponent<Props>;
