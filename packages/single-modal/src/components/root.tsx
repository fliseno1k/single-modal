import { memo } from 'react';
import { SingleModalContext } from '../context';
import { usePrivateApi } from '../hooks';

export const SingleModalRoot = memo(() => {
	const { open, view, Inserted, loading } = usePrivateApi();

	return (
		<SingleModalContext.Provider value={true}>
			<Inserted open={open} view={view} loading={loading} />
		</SingleModalContext.Provider>
	);
});
