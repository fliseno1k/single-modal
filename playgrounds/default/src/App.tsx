import './App.css';
import { Modal } from '../components/modal';
import { createSingleModal } from '../../../src';

import { AuthFormViewContract } from '../components/auth-form/contract';

const { Component, usePublicApi } = createSingleModal({
	modal: Modal,
	views: {
		[AuthFormViewContract.key]: AuthFormViewContract,
	},
});

function Test() {
	const publicApi = usePublicApi();
	return <button onClick={() => publicApi.open('auth-form', { session: 'hello' })}>Open unique</button>;
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
