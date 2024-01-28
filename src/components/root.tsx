import { ComponentType, memo } from 'react';
import { SingleModalContext } from '../context';
import { usePrivateApi } from '../hooks';

export const SingleModalRoot = () => {
	const { isOpen, views, Inserted } = usePrivateApi();
	return (
		<SingleModalContext.Provider value={true}>
			<Inserted open={isOpen} views={views} />
		</SingleModalContext.Provider>
	);
};
