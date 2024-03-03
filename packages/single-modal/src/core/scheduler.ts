export type Task = {
	order: number;
	fn: () => void;
};

type Comparator<T> = (a: T, b: T) => boolean;

const top = 0;
const parent = (i: number) => ((i + 1) >>> 1) - 1;
const left = (i: number) => (i << 1) + 1;
const right = (i: number) => (i + 1) << 1;

export class PriorityQueue<T> {
	private heap: T[] = [];

	public constructor(private readonly comparator: Comparator<T>) {}

	public get size() {
		return this.heap.length;
	}

	public isEmpty() {
		return this.size == 0;
	}

	public peek() {
		return this.heap[top];
	}

	public push(...values: T[]) {
		values.forEach((value) => {
			this.heap.push(value);
			this.siftUp();
		});
		return this.size;
	}

	public pop() {
		const node = this.peek();
		const bottom = this.size - 1;

		if (bottom > top) {
			this.swap(top, bottom);
		}

		this.heap.pop();
		this.siftDown();

		return node;
	}

	public replace(value: T) {
		const replacedValue = this.peek();
		this.heap[top] = value;
		this.siftDown();

		return replacedValue;
	}

	private greater(i: number, j: number) {
		return this.comparator(this.heap[i], this.heap[j]);
	}

	private swap(i: number, j: number) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	private siftUp() {
		let node = this.size - 1;
		while (node > top && this.greater(node, parent(node))) {
			this.swap(node, parent(node));
			node = parent(node);
		}
	}

	private siftDown() {
		let node = top;
		while (
			(left(node) < this.size && this.greater(left(node), node)) ||
			(right(node) < this.size && this.greater(right(node), node))
		) {
			const maxChild = right(node) < this.size && this.greater(right(node), left(node)) ? right(node) : left(node);
			this.swap(node, maxChild);
			node = maxChild;
		}
	}
}

const taskQueue = new PriorityQueue<Task>((a, b) => a.order >= b.order);

function flushWork() {
	if (taskQueue.isEmpty()) return;
	taskQueue.pop().fn();
}

export const Scheduler = {
	enqueueTask: taskQueue.push.bind(taskQueue),
	isEmpty: taskQueue.isEmpty.bind(taskQueue),
	flushWork,
};
