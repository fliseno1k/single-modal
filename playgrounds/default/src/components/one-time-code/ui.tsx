import React from 'react';
import { Flex, Group, Button, PinInput } from '@mantine/core';

import { useProtectedApi } from '../../single-modal';

export default function OneTimeCode() {
	const api = useProtectedApi();

	return (
		<Flex direction="column" w="300px">
			<Flex justify={'center'}>
				<PinInput />
			</Flex>
			<Group mt="lg" display="flex" justify="flex-end" gap="sm">
				<Button variant="filled" onClick={() => api.close({ force: true, closable: true })}>
					Confirm
				</Button>
			</Group>
		</Flex>
	);
}
