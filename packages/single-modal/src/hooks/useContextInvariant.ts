import { useContext } from 'react';
import { invariant, type SmError } from '../utils';
import { SingleModalContext } from '../context';

export function useContextInvariant(error: SmError) {
	invariant(useContext(SingleModalContext), error);
}
