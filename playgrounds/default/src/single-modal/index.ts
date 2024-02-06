import { createSingleModal } from '../../../../src';
import { Modal } from '../components/modal';
import { AuthFormViewContract } from '../components/auth-form/contract';

export const { Component, usePublicApi, useProtectedApi } = createSingleModal({
	modal: Modal,
	views: {
		[AuthFormViewContract.key]: AuthFormViewContract,
	},
});
