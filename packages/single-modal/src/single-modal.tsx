import { useEffect } from 'react';
import { Model } from './core';
import { SingleModalRoot } from './components';
import { SmError, invariant } from './utils';
import type { SingleModalOptions } from './types';

export function SingleModal(props: SingleModalOptions) {
	const { modal } = props;
	const isAllRequiredOptionsProvided = modal;

	invariant(isAllRequiredOptionsProvided, SmError.PROVIDE_ALL_REQUIRED_OPTIONS);
	useEffect(() => Model.storeOptions(props), [props]);

	return <SingleModalRoot />;
}
