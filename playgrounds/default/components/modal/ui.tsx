import { useFloating, FloatingFocusManager, FloatingOverlay, useTransitionStyles } from '@floating-ui/react';
import s from './style.module.scss';

export const Modal = (props: unknown) => {
	const { views, isOpen } = props;

	const { refs, context } = useFloating({
		open: isOpen,
		strategy: 'fixed',
	});

	const { isMounted, styles } = useTransitionStyles(context, {
		initial: {
			opacity: 0,
			transform: 'scale(0.5)',
		},
		open: {
			opacity: 1,
			transform: 'scale(1)',
		},
		close: {
			opacity: 0,
			transform: 'scale(0.5)',
		},
	});

	return isMounted ? (
		<FloatingFocusManager context={context}>
			<FloatingOverlay>
				<div ref={refs.setFloating} className={s._} style={styles}>
					<span>I'm modal component</span>
					<div className={s.__inner}>
						{(views || []).map((v, i) => {
							return <v.default key={i} />;
						})}
					</div>
				</div>
			</FloatingOverlay>
		</FloatingFocusManager>
	) : null;
};
