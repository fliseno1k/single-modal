import viteLogo from '/vite.svg';
import './App.css';
import { Modal } from '../components/modal';
import { createSingleModal } from '../../../src';
import { useEffect } from 'react';

const Preloader = () => <span>I'm preloader component</span>;

const SingleModal = createSingleModal({
	modal: Modal,
	loader: Preloader,
	views: [
		{
			key: 'unique',
			// @ts-expect-error: idk
			loader: () => import('../components/auth-form'),
			props: {},
		},
	] as const,
});

function Test() {
	const publicApi = SingleModal.usePublicApi();
	return <button onClick={() => publicApi.open('unique')}>Open unique</button>;
}

function App() {
	return (
		<>
			<SingleModal.Component />
			<Test />
		</>
	);
}

export default App;
