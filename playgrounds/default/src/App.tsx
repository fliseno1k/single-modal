import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';

import { SingleModalView, createSingleModal } from '../../../src';

const Modal = () => <span>I'm modal component</span>;
const Preloader = () => <span>I'm preloader component</span>;

const api = createSingleModal({
	modal: Modal,
	loader: Preloader,
	renderer: Preloader,
	views: [
		{
			key: 'unique',
			loader: () => import('../components/preloader.tsx'),
			props: {},
		},
	],
});

function App() {
	const [count, setCount] = useState(0);

	const { open } = api.usePublicApi();

	// open('kk');
	open('k', { force: false, closable: true });

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	);
}

export default App;
