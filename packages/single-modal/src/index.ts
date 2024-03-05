export type { SingleModalOptions, SingleModalAPI, SingleModalView, ModalProps } from './types';
export { createSingleModal } from './single-modal';

/*
  Implement: 
    - discloure manager;
    - remove modals list registration on init, 
      open on provided component loader (sync/async)
    - advance globalAPI:
        interface next-g-api--v {
          isAnyOpen(): boolean;
          closeCurrent(): void;
          closeAll(): void; - with all scheduled views
        }

        upds: 
          open() - only intime modals;
          schedule() - wait for close all

    interface SMGlobalAPI {
      open<Props>(loader: Promise<ComponentType<Props>> | ComponentType<Props>): void;
    }
*/
