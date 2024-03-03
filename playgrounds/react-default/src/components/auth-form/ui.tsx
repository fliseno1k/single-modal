import React from "react";
import {
	Flex,
	TextInput,
	NumberInput,
	Group,
	Button,
	PasswordInput,
	Space,
} from "@mantine/core";

import { useProtectedApi } from "../../lib/single-modal-service";

export default function AuthForm() {
	const api = useProtectedApi();

	return (
		<>
			<Flex gap="sm" justify="space-between">
				<TextInput w="100%" label="Username" />
				<NumberInput w="100%" label="Age" />
			</Flex>
			<Space h={1} />
			<Flex>
				<PasswordInput w="100%" label="Password" />
			</Flex>
			<Group mt="lg" display="flex" justify="flex-end" gap="sm">
				<Button variant="filled" onClick={() => api.push("one-time-code")}>
					Confirm
				</Button>
				<Button variant="outline" onClick={() => api.close()}>
					Close
				</Button>
			</Group>
		</>
	);
}

AuthForm.displayName = "auth-form";
