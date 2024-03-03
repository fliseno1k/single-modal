import { Modal } from "../../components/modal";
import { AuthFormViewContract } from "../../components/auth-form";
import { OneTimeCodeContract } from "../../components/one-time-code/contract";

import { createSingleModal } from "single-modal";

export const { Component, globalApi, usePublicApi, useProtectedApi } =
	createSingleModal({
		modal: Modal,
		views: {
			[AuthFormViewContract.key]: AuthFormViewContract,
			[OneTimeCodeContract.key]: OneTimeCodeContract,
		} as const,
	});
