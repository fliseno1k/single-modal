import { useContext } from 'react';
import { invariant } from '../utils';
import { SingleModalContext } from '../context';

export function useContextInvariant(message: string) {
	invariant(useContext(SingleModalContext), message);
}
