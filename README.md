# Single-Modal

A tiny ui-less manager of modals for React.

## Installation

NOTE: still not published.

```sh
npm install single-modal
```

## Guide

### Initialization

```ts
import {
	SingleModal,
	publicAPI,
	type ModalProps,
} from "single-modal";

function ModalRenderer(props: ModalProps) {
	const { isOpen, loading, view: View } = props;

	if (loading) {
		return 'loading...';
	}

	return isOpen && View ? <View /> : null;
}

export default function App() {
	return (
		<SingleModal modal={ModalRenderer} />
	);
}

```

### Modal loaders

Loader is a user-defined method that returns either a static component or a dynamically loaded one.

```ts
import type { ComponentLoader } from "single-modal";
import type { AuthFormProps } from "./ui";

// async loader
export const AuthFormLoader: ComponentLoader<AuthFormProps> = () =>
	new Promise((resolve) => setTimeout(() => resolve(import("./ui")), 500));

// sync loader
import { AuthForm } from './ui';

export const AuthFormLoader: ComponentLoader<AuthFormProps> = () => AuthForm);

```

### `publicAPI`

It contains default methods to manage the state from inside or outside of the manager (`SingleModal`) context.

```ts
import { publicAPI } from "single-modal";
```

#### Methods:

- `open(componentLoader, componentProps): void` - opens the loaded component with the provided props passed to it.;
- `close(): void` - closes current modal;
- `schedule(componentLoader, componentProps): void` - the loaded component opens after closing the current modal or immediately if no modal is open. The task is pushed into a queue-like data structure;
- `isAnyOpen(): boolean` - checks if any modal is currently open;

#### Usage example:

```ts
import { publicAPI } from "single-modal";
import { AuthFormLoader } from "./loaders";

export default AnyComponent() {
	...

	function openAuthModal() {
		publicAPI.open(AuthFormLoader, {...});
	}

	...
}

```

### `useProtectedAPI()`

The hook provides methods that are only available within the modal and is protected from usage outside of the `SingleModal` context by an internal invariant.

#### Methods:

Pending...

### Usage examples:

Pending...

## Development roadmap/phases

Pending...
