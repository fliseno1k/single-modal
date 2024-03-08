import { Center, Flex, Button, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { Modal } from "./components/modal";

import { AuthFormLoader } from "./components";
import { SingleModal, publicAPI } from "single-modal";

export default function App() {
	return (
		<MantineProvider>
			<SingleModal modal={Modal} />
			<Center w="100vw" h="100%">
				<Flex w="100%" h="100%" justify="center" gap="sm" align="center">
					<Button onClick={openAuthModal}>Open auth modal</Button>
				</Flex>
			</Center>
		</MantineProvider>
	);

	function openAuthModal() {
		publicAPI.open(AuthFormLoader, {
			onSuccess: () => console.log("success"),
		});
	}
}
