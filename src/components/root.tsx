import { memo } from 'react';
import { SingleModalContext } from '../context';
import { usePrivateApi } from '../hooks';

export const SingleModalRoot = memo(() => {
	const { isOpen, views, Inserted } = usePrivateApi();

	return (
		<SingleModalContext.Provider value={true}>
			<Inserted open={isOpen} views={views} />
		</SingleModalContext.Provider>
	);
});
