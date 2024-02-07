import React from 'react';
import { Modal as MantineModal, Skeleton, Flex, Paper, Transition } from '@mantine/core';
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
		<MantineModal centered withCloseButton={false} opened={open} onClose={() => {}} flex={0} my={'auto'}>
			<Flex mih="100px" justify={'center'} pos="relative">
				<Transition key="loader" mounted={loading} transition={fade} duration={200} timingFunction="ease">
					{(transitionStyle) => (
						<Flex
							pos={'absolute'}
							inset={0}
							align={'center'}
							justify={'center'}
							bg={'white'}
							style={{ ...transitionStyle, zIndex: 2 }}
						>
							<Skeleton w="100%" h="100%" radius={0} />
						</Flex>
					)}
				</Transition>

				<Transition mounted={!loading} transition={fade} duration={200} timingFunction="ease">
					{(transitionStyle) => (
						<Paper style={{ ...transitionStyle, zIndex: 1 }}>
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
