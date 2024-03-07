import {
	Flex,
	TextInput,
	NumberInput,
	Button,
	Group,
	Space,
	Accordion,
} from "@mantine/core";

import { usePublicApi } from "single-modal";

const groceries = [
	{
		emoji: "🍎",
		value: "Apples",
		description:
			"Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
	},
	{
		emoji: "🍌",
		value: "Bananas",
		description:
			"Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
	},
	{
		emoji: "🥦",
		value: "Broccoli",
		description:
			"Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
	},
];

export interface AccordionProps {}

export default function AccordionModal(props: AccordionProps) {
	const pubApi = usePublicApi();

	const items = groceries.map((item) => (
		<Accordion.Item key={item.value} value={item.value}>
			<Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
			<Accordion.Panel>{item.description}</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<>
			<Flex gap="sm" justify="space-between">
				<TextInput w="100%" label="Username" />
				<NumberInput w="100%" label="Age" />
			</Flex>
			<Space h={1} />
			<Accordion defaultValue="Apples">{items}</Accordion>
			<Group mt="lg" display="flex" justify="flex-end" gap="sm">
				<Button variant="outline" onClick={() => pubApi.close()}>
					Close
				</Button>
			</Group>
		</>
	);
}

AccordionModal.displayName = "accordion-modal";
