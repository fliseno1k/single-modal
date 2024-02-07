import React from 'react';
import { Flex, Group, Button, PinInput } from '@mantine/core';

import { useProtectedApi } from '../../single-modal';

export default function OneTimeCode() {
	const api = useProtectedApi();

	return (
		<Flex direction="column">
			<Flex justify={'center'}>
				<PinInput size="xl" />
			</Flex>
			<Group mt="lg" display="flex" justify="flex-end" gap="sm">
				<Button variant="filled" onClick={() => api.close()}>
					Confirm
				</Button>
				{api.back && (
					<Button variant="outline" onClick={() => api.back?.()}>
						Back
					</Button>
				)}
			</Group>
		</Flex>
	);
}

OneTimeCode.displayName = 'one-time-code';