import { Modal as MantineModal, Loader, Flex } from "@mantine/core";
import { type ModalProps } from "single-modal";

import type { HTMLMotionProps } from "framer-motion";
import { m, domAnimation, AnimatePresence, LazyMotion } from "framer-motion";
import { useMeasure } from "react-use";
import styles from "./style.module.scss";

const motionProps: HTMLMotionProps<"div"> = {
	initial: {
		opacity: 0,
		scale: 0.95,
	},
	animate: {
		opacity: 1,
		scale: 1,
	},
	exit: {
		opacity: 0,
		scale: 1.05,
	},
	transition: {
		duration: 0.15,
		delay: 0.15,
		ease: "easeInOut",
	},
};
export const Modal = (props: ModalProps) => {
	const { view: View, open, loading } = props;
	const [ref, { height }] = useMeasure<HTMLDivElement>();

	return (
		<MantineModal
			centered
			withCloseButton={false}
			opened={open}
			onClose={() => {}}
			flex={0}
			my={"auto"}
		>
			<Flex
				mih="60"
				justify={"center"}
				className={styles.scrollable}
				style={{ height }}
			>
				<div ref={ref} className={styles.inserted}>
					<LazyMotion features={domAnimation}>
						<AnimatePresence mode="wait" initial={false}>
							{loading && (
								<m.div {...motionProps} key="loader" className={styles.loader}>
									<Loader />
								</m.div>
							)}

							{!loading && View && (
								<m.div key={View?.displayName} {...motionProps}>
									<View />
								</m.div>
							)}
						</AnimatePresence>
					</LazyMotion>
				</div>
			</Flex>
		</MantineModal>
	);
};
