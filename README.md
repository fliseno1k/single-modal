# single-modal

A tiny ui-less manager of modals for React.

## Installation

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
import { AuthForm } from "./ui";

export const AuthFormLoader: ComponentLoader<AuthFormProps> = () => AuthForm;
```

### `publicAPI`

It contains default methods to manage the state from inside or outside of the manager (`SingleModal`) context.

```ts
import { publicAPI } from "single-modal";
```

#### Methods:

- `open(loader, props): void` - opens the loaded component with the provided props passed to it;

- `close(): void` - closes current modal;

- `schedule(loader, props): void` - the loaded component opens after closing the current modal or immediately if no modal is open. The task is pushed into a queue-like data structure;

- `isAnyOpen(): boolean` - checks if any modal is currently open;

### `useProtectedAPI()`

The hook provides methods that are only available within the modal and is protected from usage outside of the `SingleModal` context by an internal invariant.

#### Methods:

- `push(loader, props): void` - opens the next modal while saving the previous one to the internal history, enabling you to return to it trought `back` method;

- `replace(loader, props): void` - opens the specified modal and replaces the previous one in the history, ensuring seamless navigation;

- `back: () => void | undefined ` - returns to the previous modal if the call history is not empty. If the history is empty this field has an `undefined` value;

NOTE: The internal history is cleared when calling the `open` or `close` method from the publicAPI;

## Development roadmap/phases

Pending...
