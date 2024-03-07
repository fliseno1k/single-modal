import {
	Flex,
	TextInput,
	NumberInput,
	Group,
	Button,
	PasswordInput,
	Space,
} from "@mantine/core";

import { usePublicApi, useProtectedApi } from "single-modal";
import { OneTimeCodeLoader } from "../one-time-code";

export default function AuthForm() {
	const protApi = useProtectedApi();
	const pubApi = usePublicApi();

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
				<Button
					variant="filled"
					onClick={() => protApi.push(OneTimeCodeLoader, null)}
				>
					Confirm
				</Button>
				<Button variant="outline" onClick={() => pubApi.close()}>
					Close
				</Button>
			</Group>
		</>
	);
}

AuthForm.displayName = "auth-form";
