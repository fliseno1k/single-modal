import React from 'react';
import { Flex, TextInput, NumberInput, Group, Button } from '@mantine/core';

import { useProtectedApi } from '../../single-modal';

export default function AuthForm() {
	const api = useProtectedApi();

	return (
		<>
			<Flex direction={'column'}>
				<TextInput label="Username" />
				<NumberInput label="Age" />
			</Flex>
			<Group mt="lg" display="flex" justify="flex-end" gap="sm">
				<Button
					variant="filled"
					onClick={() => api.replace('one-time-code', undefined, { force: true, closable: true })}
				>
					Confirm
				</Button>
				<Button variant="outline" onClick={() => api.close({ force: false, closable: true })}>
					Close
				</Button>
			</Group>
		</>
	);
}
