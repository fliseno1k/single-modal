export type Task = () => void;

const queue: Task[] = [];

function enqueueTask(task: Task) {
	queue.push(task);
}

function flushWork() {
	queue.shift()?.();
}

function isEmpty() {
	return queue.length === 0;
}

export const Scheduler = {
	enqueueTask,
	flushWork,
	isEmpty,
};
