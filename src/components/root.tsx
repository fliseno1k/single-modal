import { memo } from 'react';
import { SingleModalContext } from '../context';
import { usePrivateApi } from '../hooks';

export const SingleModalRoot = memo((_) => {
	const { isOpen, views, Inserted } = usePrivateApi();

	return (
		<SingleModalContext.Provider value={true}>
			<Inserted open={isOpen} />
		</SingleModalContext.Provider>
	);
});
