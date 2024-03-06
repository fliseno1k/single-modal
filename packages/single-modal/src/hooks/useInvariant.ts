import { useContext } from 'react';
import { SmError, invariant } from '../utils';
import { SingleModalContext } from '../context';

export function useInvariant(error: SmError) {
	invariant(useContext(SingleModalContext), error);
}
