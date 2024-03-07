import { map } from 'nanostores';
import type { SingleModalState, SingleModalOptions } from '../types';

class Transaction<T extends object, K extends { get(): T; set(value: T): void }> {
	private state: T;

	public constructor(private readonly store: K) {
		this.state = Object.assign({}, store.get());
	}

	public stage(handler: (prev: T) => Partial<T>): Transaction<T, K> {
		const updatedState = handler(this.store.get());
		this.state = Object.assign(this.state, updatedState);
		return this;
	}

	public commit(): Transaction<T, K> {
		this.store.set(Object.assign({}, this.state));
		return this;
	}
}

const initial: SingleModalState = {
	isOpen: false,
	loading: false,
	canNavigateBack: false,
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

function startTransaction() {
	return new Transaction<SingleModalState, typeof $state>($state);
}

export const Model = {
	select,
	storeOptions,
	startTransaction,
	_subscriber: $state,
	_statics: $options,
};
