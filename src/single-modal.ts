interface SingleModalOptions {}

interface SingleModalAPI {
	usePublicAPI(): void;
	usePrivateAPI(): void;
	Component: unknown;
}

export function createSingleModal(options: SingleModalOptions): SingleModalAPI {
	return {} as SingleModalAPI;
}
