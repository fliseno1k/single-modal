import s from './style.module.scss';

export const Modal = (props: unknown) => {
	const { views } = props;

	return (
		<div className={s._}>
			<span>I'm modal component</span>
			<div className={s.__inner}>
				{(views || []).map((v, i) => {
					return <v.default key={i} />;
				})}
			</div>
		</div>
	);
};
