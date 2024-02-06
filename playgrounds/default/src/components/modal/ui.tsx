import s from './style.module.scss';

import { Modal as MantineModal, Flex, Group } from '@mantine/core';

export const Modal = (props: unknown) => {
	const { views, isOpen } = props;

	return (
		<MantineModal opened={isOpen} onClose={() => {}} title="Authentication">
			<div className={s._}>
				<span>I'm modal component</span>
				<div className={s.__inner}>
					{/* {(views || []).map((v, i) => {
						return <v.default key={i} />;
					})} */}
				</div>
			</div>
		</MantineModal>
	);
};
