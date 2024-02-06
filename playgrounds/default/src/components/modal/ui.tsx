import React from 'react';
import { Modal as MantineModal } from '@mantine/core';

export const Modal = (props: unknown) => {
	const { views, open } = props;

	console.log(props);

	return (
		<MantineModal opened={open} onClose={() => {}} title="Login">
			{(views || []).map((v, i) => {
				return <v.default key={i} />;
			})}
		</MantineModal>
	);
};
