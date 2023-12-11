import { useContext } from 'react';
import { SingleModalContext } from '../context';
import { invariant } from '../utils';

export function useSingleModalGuard(caller: string) {
	const value = useContext(SingleModalContext);
	invariant(value, `${caller} can be use only inside of 'SingleModalRoot' component`);
}
