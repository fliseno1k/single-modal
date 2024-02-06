import React from 'react';
import { Center, Flex, Button, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { usePublicApi, Component } from './single-modal';

function App() {
	const publicApi = usePublicApi();

	return (
		<MantineProvider>
			<Component />
			{/* <Test /> */}
			<Center w="100vw" h="100%">
				<Flex w="100%" h="100%" justify="center" gap="sm" align="center">
					{/* <Button onClick={() => publicApi.open('auth-form', { session: 'hello' })}>Btn 1</Button> */}
					<Button onClick={() => publicApi.open('auth-form', {})}>Btn 2</Button>
				</Flex>
			</Center>
		</MantineProvider>
	);
}

export default App;
