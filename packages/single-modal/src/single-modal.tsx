import { useEffect } from 'react';
import { Model } from './core';
import { SingleModalRoot } from './components';
import { invariant } from './utils';
import type { SingleModalOptions } from './types';

export function SingleModal(props: SingleModalOptions) {
	const { renderer } = props;
	const isAllRequiredOptionsProvided = !!renderer;

	invariant(
		isAllRequiredOptionsProvided,
		"Provide all required options from 'SingleModalOptions' interface to initialize SingleModal instance",
	);
	useEffect(() => Model.storeOptions(props), [props]);

	return <SingleModalRoot />;
}
