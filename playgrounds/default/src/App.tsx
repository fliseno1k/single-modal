import { useEffect, useState } from 'react';
import { Center, Flex, Button, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { createSingleModal } from '../../../src';
import { Modal } from './components/modal';
import { AuthFormViewContract } from './components/auth-form/contract';

const { Component, usePublicApi } = createSingleModal({
	modal: Modal,
	views: {
		[AuthFormViewContract.key]: AuthFormViewContract,
	},
});

function App() {
	const [value, setValue] = useState(false);
	// const publicApi = usePublicApi();

	useEffect(() => {
		setTimeout(() => setValue(true), 2000);
	}, []);

	return (
		<MantineProvider>
			<Component />
			{/* <Test /> */}
			<Center w="100vw" h="100%">
				<Flex w="100%" h="100%" justify="center" gap="sm" align="center">
					{/* <Button onClick={() => publicApi.open('auth-form', { session: 'hello' })}>Btn 1</Button> */}
					<Button>Btn 2</Button>
				</Flex>
			</Center>
			<Modal isOpen={value} />
		</MantineProvider>
	);
}

export default App;
