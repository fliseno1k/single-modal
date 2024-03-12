import { Center, Flex, Button, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { Modal } from "./components/modal";

import { AuthFormLoader, OneTimeCodeLoader } from "./components";
import { SingleModal, publicAPI } from "single-modal";

export default function App() {
	return (
		<MantineProvider>
			<SingleModal renderer={Modal} />
			<Center w="100vw" h="100%">
				<Flex w="100%" h="100%" justify="center" gap="sm" align="center">
					<Button onClick={openAuthModal}>Open auth modal</Button>
				</Flex>
			</Center>
		</MantineProvider>
	);

	function openAuthModal() {
		publicAPI.open(OneTimeCodeLoader, { sessionTkn: "unique" });
		publicAPI.softOpen(AuthFormLoader, {
			onSuccess: () => console.log("success"),
		});
	}
}
