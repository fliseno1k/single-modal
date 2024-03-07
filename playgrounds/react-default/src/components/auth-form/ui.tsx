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
import { useEffect, useRef } from "react";
import { AccordionLoader } from "../accordion/loader";

export interface AuthFormProps {
	onSuccess: () => void;
}

export default function AuthForm(props: AuthFormProps) {
	const ref = useRef(false);

	const protApi = useProtectedApi();
	const pubApi = usePublicApi();

	useEffect(() => {
		if (!ref.current) {
			pubApi.schedule(AccordionLoader, {});
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
				<Button
					variant="filled"
					onClick={() =>
						protApi.push(OneTimeCodeLoader, { sessionTkn: "unique-tkn" })
					}
				>
					Next
				</Button>
				<Button variant="outline" onClick={() => pubApi.close()}>
					Close
				</Button>
			</Group>
		</>
	);
}

AuthForm.displayName = "auth-form";
