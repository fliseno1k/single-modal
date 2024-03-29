import { Flex, Group, Button, PinInput } from "@mantine/core";
import { useProtectedApi, publicAPI } from "single-modal";

export interface OneTimeCodeProps {
	sessionTkn?: string;
}

export default function OneTimeCode() {
	const protectedApi = useProtectedApi();

	return (
		<Flex direction="column">
			<Flex justify={"center"}>
				<PinInput size="xl" />
			</Flex>
			<Group mt="lg" display="flex" justify="flex-end" gap="sm">
				<Button variant="filled" onClick={publicAPI.close}>
					Confirm
				</Button>
				{protectedApi.back && (
					<Button variant="outline" onClick={protectedApi.back}>
						Back
					</Button>
				)}
			</Group>
		</Flex>
	);
}

OneTimeCode.displayName = "one-time-code";
