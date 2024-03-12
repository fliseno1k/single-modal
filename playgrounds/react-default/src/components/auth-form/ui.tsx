import {
	Flex,
	TextInput,
	NumberInput,
	Group,
	Button,
	PasswordInput,
	Space,
} from "@mantine/core";

import { publicAPI, useProtectedApi } from "single-modal";
import { OneTimeCodeLoader } from "../one-time-code";
import { useEffect, useRef } from "react";
import { AccordionLoader } from "..";

export interface AuthFormProps {
	onSuccess: () => void;
}

export default function AuthForm(_: AuthFormProps) {
	const ref = useRef(false);
	const protectedApi = useProtectedApi();

	useEffect(() => {
		if (!ref.current) {
			publicAPI.softOpen(AccordionLoader, {});
			ref.current = true;
		}
	}, []);

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
				<Button variant="filled" onClick={openNextModal}>
					Next
				</Button>
				<Button variant="outline" onClick={publicAPI.close}>
					Close
				</Button>
			</Group>
		</>
	);

	function openNextModal() {
		protectedApi.push(OneTimeCodeLoader, { sessionTkn: "unique-tkn" });
	}
}

AuthForm.displayName = "auth-form";
