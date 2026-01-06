import {BaseState} from '__reducers';

import {store} from './configureStore';

export enum Status {
    Success = 'success',
    Pending = 'pending',
    Failed = 'failed',
}

export type StoreState<D> = {
    status?: Status;
    error?: string;
    data?: D;
}

export type CommonStore = ReturnType<typeof store.getState> & BaseState;
