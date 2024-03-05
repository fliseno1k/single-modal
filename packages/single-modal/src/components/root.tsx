import { memo } from 'react';
import { SingleModalContext } from '../context';
import { usePrivateApi } from '../hooks';

export const SingleModalRoot = memo(() => {
	const { isOpen, view, Inserted, loading } = usePrivateApi();

	return (
		<SingleModalContext.Provider value={true}>
			<Inserted isOpen={isOpen} view={view} loading={loading} />
		</SingleModalContext.Provider>
	);
});
