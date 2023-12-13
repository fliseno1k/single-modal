import { useContext } from 'react';
import { SingleModalContext } from '../context';
import { invariant } from '../utils';
import { SmError } from '../utils/error';

export function useProtectedApi() {
	const value = useContext(SingleModalContext);
	invariant(value, SmError.USE_PROTECTED_API_OUTSIDE_CONTEXT);

	return null;
}
