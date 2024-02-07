import { createSingleModal } from '../../../../src';
import { Modal } from '../components/modal';
import { AuthFormViewContract } from '../components/auth-form';
import { OneTimeCodeContract } from '../components/one-time-code/contract';

export const { Component, usePublicApi, useProtectedApi } = createSingleModal({
	modal: Modal,
	views: {
		[AuthFormViewContract.key]: AuthFormViewContract,
		[OneTimeCodeContract.key]: OneTimeCodeContract,
	} as const,
});
