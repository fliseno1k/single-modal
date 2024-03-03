import {
	AuthFormViewContract,
	OneTimeCodeViewContract,
} from "../../components";
import { Modal } from "../../components/modal";

import { createSingleModal } from "single-modal";

export const { Component, globalApi, usePublicApi, useProtectedApi } =
	createSingleModal({
		modal: Modal,
		views: {
			[AuthFormViewContract.key]: AuthFormViewContract,
			[OneTimeCodeViewContract.key]: OneTimeCodeViewContract,
		} as const,
	});
