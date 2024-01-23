export function toNonNullable<T>(obj: T): NonNullable<T> {
	return obj as NonNullable<T>;
}
