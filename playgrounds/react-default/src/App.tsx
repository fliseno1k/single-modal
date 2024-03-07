import { Center, Flex, Button, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { Modal } from "./components/modal";

import { AuthFormLoader } from "./components/auth-form";
import { SingleModal, usePublicApi } from "single-modal";

function App() {
	const { open } = usePublicApi();

	return (
		<MantineProvider>
			<SingleModal modal={Modal} />
			<Center w="100vw" h="100%">
				<Flex w="100%" h="100%" justify="center" gap="sm" align="center">
					<Button
						onClick={() =>
							open(AuthFormLoader, { onSuccess: () => console.log("success") })
						}
					>
						Auth
					</Button>
				</Flex>
			</Center>
		</MantineProvider>
	);
}

export default App;
