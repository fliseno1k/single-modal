import { useContext, createContext } from 'react';

export const SingleModalContext = createContext(false);

export function useSmCtx() {
	return useContext(SingleModalContext);
}
