import { map } from 'nanostores';
import type { SingleModalState, SingleModalOptions } from '../types';

class Tx<T extends object, K extends { get(): T; set(value: T): void }> {
	private state: T;

	public constructor(private readonly store: K) {
		this.state = Object.assign({}, store.get());
	}

	public stage(handler: (prev: T) => Partial<T>): Tx<T, K> {
		const updatedState = handler(this.store.get());
		this.state = Object.assign(this.state, updatedState);
		return this;
	}

	public commit(): Tx<T, K> {
		this.store.set(Object.assign({}, this.state));
		return this;
	}

	public inspect(): T {
		return { ...this.state };
	}
}

const initial: SingleModalState = {
	isOpen: false,
	loading: false,
	output: [],
};

const $state = map<SingleModalState>(initial);
const $options = map<SingleModalOptions>({} as SingleModalOptions);

function select<Key extends keyof SingleModalState>(key: Key): SingleModalState[Key] {
	return $state.get()[key];
}

function storeOptions(options: SingleModalOptions) {
	$options.set(options);
}

function initTx() {
	return new Tx<SingleModalState, typeof $state>($state);
}

export const Model = {
	select,
	storeOptions,
	initTx,
	_subscriber: $state,
	_statics: $options,
};