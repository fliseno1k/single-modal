import type { ComponentType } from 'react';

export interface SingleModalOptions {
	views: SingleModalView[];
}

export interface SingleModalAPI {
	usePublicApi(): void;
	useProtectedApi(): void;
	Component: unknown;
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

export type ComponentLoader<Props> = Promise<ComponentType<Props> | { default: ComponentType<Props> }>;
