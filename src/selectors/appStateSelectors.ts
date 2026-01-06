import {createSelector} from 'reselect';

import {CommonStore} from '__store/types';

export const appStateSelector = createSelector(
    (state: CommonStore) => state.appState,
    data => data,
);
