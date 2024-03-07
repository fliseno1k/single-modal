import { Flex, Group, Button, PinInput } from "@mantine/core";
import { useProtectedApi, usePublicApi } from "single-modal";

export interface OneTimeCodeProps {
	sessionTkn?: string;
}

export default function OneTimeCode() {
	const protApi = useProtectedApi();
	const pubApi = usePublicApi();

	return (
		<Flex direction="column">
			<Flex justify={"center"}>
				<PinInput size="xl" />
			</Flex>
			<Group mt="lg" display="flex" justify="flex-end" gap="sm">
				<Button variant="filled" onClick={() => pubApi.close()}>
					Confirm
				</Button>
				{protApi.back && (
					<Button variant="outline" onClick={() => protApi.back?.()}>
						Back
					</Button>
				)}
			</Group>
		</Flex>
	);
}

OneTimeCode.displayName = "one-time-code";
