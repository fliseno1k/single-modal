import { map, computed, MapStore } from 'nanostores';
import type { SingleModalState, SingleModalOptions, SingleModalView } from '../types';

class Transaction<T extends object, K extends { get(): T; set(value: T): void }> {
	private delta: Partial<T> = {};

	private state: T;

	private readonly commits: Partial<T>[] = [];

	public constructor(private readonly store: K) {
		this.state = Object.assign({}, store.get());
	}

	public stage(handler: (prev: T) => Partial<T>): Transaction<T, K> {
		const prevState = this.store.get();
		const nextState = handler(prevState);

		this.state = { ...prevState, ...nextState };

		return this;
	}

	public add<Key extends keyof T>(key: Key, fn: (value: T[Key]) => T[Key]): Transaction<T, K> {
		this.delta[key] = this.state[key];
		this.state[key] = fn(this.store.get()[key]);
		return this;
	}

	public commit(): Transaction<T, K> {
		this.store.set(Object.assign({}, this.state));
		return this;
	}

	public undo(): Transaction<T, K> {
		if (!this.commits.length) {
			return this;
		}

		const delta = this.commits.pop() as Partial<T>;
		for (const key in delta) {
			this.state[key] = delta[key]!;
		}

		this.store.set(this.state);
		return this;
	}
}

const initial: SingleModalState = {
	open: false,
	loading: false,
	canNavigateBack: false,
	output: [],
};

const $state = map<SingleModalState>(initial);

const select = <Key extends keyof SingleModalState>(key: Key): SingleModalState[Key] => {
	return $state.get()[key];
};

const statics = (() => {
	const $options = map<SingleModalOptions>({} as SingleModalOptions);
	const $views = computed<Map<string, SingleModalView<unknown>>, MapStore<SingleModalOptions>>($options, (options) => {
		return new Map((Object.values(options.views) || []).map((view) => [view.key, view]));
	});

	return {
		$options,
		$views,
	};
})();

const storeOptions = (options: SingleModalOptions) => {
	statics.$options.set(options);
	return true;
};

export const Model = {
	select,
	statics,
	storeOptions,
	startTransaction: () => new Transaction<SingleModalState, typeof $state>($state),
	_subscriber: $state,
};
