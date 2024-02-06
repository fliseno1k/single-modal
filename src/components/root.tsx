import { memo } from 'react';
import { SingleModalContext } from '../context';
import { usePrivateApi } from '../hooks';

export const SingleModalRoot = memo(() => {
	const { open, views, Inserted } = usePrivateApi();

	return (
		<SingleModalContext.Provider value={true}>
			<Inserted open={open} views={views} />
		</SingleModalContext.Provider>
	);
});
