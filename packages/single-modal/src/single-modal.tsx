import { Model } from './core';
import { SingleModalRoot } from './components';
import { SmError, invariant } from './utils';
import type { SingleModalOptions } from './types';
import { useEffect } from 'react';

export function SingleModal(props: SingleModalOptions) {
	const { modal } = props;
	const isAllRequiredOptionsProvided = modal;

	invariant(isAllRequiredOptionsProvided, SmError.PROVIDE_ALL_REQUIRED_OPTIONS);
	useEffect(() => Model.storeOptions(props), [props]);

	return <SingleModalRoot />;
}
