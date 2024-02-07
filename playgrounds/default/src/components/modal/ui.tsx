import React from 'react';
import { Modal as MantineModal, Loader, Flex, Paper, Transition } from '@mantine/core';
import { usePrevious } from '@mantine/hooks';
import type { ModalProps } from '../../../../../src/types';

const fade = {
	in: { opacity: 1, transform: 'scaleY(1)' },
	out: { opacity: 0, transform: 'scaleY(0.9)' },
	common: { transformOrigin: 'center' },
	transitionProperty: 'transform, opacity',
};

export const Modal = (props: ModalProps) => {
	const { views, open, loading } = props;
	const memoizedViews = usePrevious(views);
	const targetCollection = [views as [], memoizedViews].find((collection) => collection?.length) ?? [];

	return (
		<MantineModal centered withCloseButton={false} opened={open} onClose={() => {}}>
			<Flex pos="relative" miw={80} mih={80}>
				<Transition key="loader" mounted={loading} transition={fade} duration={200} timingFunction="ease">
					{(transitionStyle) => (
						<Flex
							pos={'absolute'}
							inset={'0'}
							align={'center'}
							justify={'center'}
							style={{ ...transitionStyle, zIndex: 1 }}
						>
							<Loader />
						</Flex>
					)}
				</Transition>

				<Transition mounted={!loading} transition={fade} duration={200} timingFunction="ease">
					{(transitionStyle) => (
						<Paper w="100%" style={{ ...transitionStyle, zIndex: 1 }}>
							{targetCollection.map((View, i) => (
								<View key={i} />
							))}
						</Paper>
					)}
				</Transition>
			</Flex>
		</MantineModal>
	);
};
