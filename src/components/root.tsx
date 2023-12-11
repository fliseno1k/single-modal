import { memo } from 'react';
import { SingleModalContext } from '../context';

export const SingleModalRoot = memo((_) => {
	return <SingleModalContext.Provider value={true} />;
});
