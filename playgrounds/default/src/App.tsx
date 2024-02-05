import './App.css';
import { Modal } from '../components/modal';
import { createSingleModal } from '../../../src';

const { Component, usePublicApi } = createSingleModal({
	modal: Modal,
	views: [
		{
			key: 'unique',
			// @ts-expect-error: idk
			loader: () => import('../components/auth-form'),
		},
	] as const,
});

function Test() {
	const publicApi = usePublicApi();
	return <button onClick={() => publicApi.open('unique')}>Open unique</button>;
}

function App() {
	return (
		<>
			<Component />
			<Test />
		</>
	);
}

export default App;
