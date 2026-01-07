import {AppStateSlice, appStateSlice} from './appStateSlice';

export type BaseState = {
    appState: AppStateSlice;
}

export const reducers = {
    appState: appStateSlice.reducer,
};
