import React from 'react';
import { Center, Flex, Button, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { globalApi, Component } from './single-modal';

function App() {
	return (
		<MantineProvider>
			<Component />
			<Center w="100vw" h="100%">
				<Flex w="100%" h="100%" justify="center" gap="sm" align="center">
					<Button onClick={() => globalApi.open('auth-form', 'queued', { session: 'unauthorized' })}>Auth</Button>
				</Flex>
			</Center>
		</MantineProvider>
	);
}

export default App;
