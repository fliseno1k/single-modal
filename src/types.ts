export interface SingleModalOptions {
	views: SingleModalView[];
}

export interface SingleModalAPI {
	usePublicApi(): void;
	useProtectedApi(): void;
	Component: unknown;
}

export interface SingleModalView {
	key: string;
	Component: unknown;
	props: unknown;
	/*
		push like de/serialization methods for saving
		intermidiate state and be available to restore iton request.
		maybe better to call it like a cache
	*/
}
