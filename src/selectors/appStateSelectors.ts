import {createSelector} from 'reselect';

import {CommonStore} from '__store/types';

export const appStateSelector = createSelector(
    (state: CommonStore) => state.appState,
    data => data,
);

export const appStateMessagesSelector = createSelector(
    appStateSelector,
    ({messages}) => messages,
);

export const appStateAuthorsSelector = createSelector(
    appStateSelector,
    ({authors}) => authors,
);

export const appStateStatesChangedDataSelector = createSelector(
    appStateSelector,
    ({statesChangedData}) => statesChangedData,
);

export const appStateSettingsSelector = createSelector(
    appStateSelector,
    ({settings}) => settings,
);

export const appStateSettingsWidgetsSelector = createSelector(
    appStateSettingsSelector,
    ({widgets}) => widgets,
);

export const appStateSettingsWidgetsMessagesSelector = createSelector(
    appStateSettingsWidgetsSelector,
    ({messages}) => messages,
);

export const appStateSettingsWidgetsStatesSelector = createSelector(
    appStateSettingsWidgetsSelector,
    ({states}) => states,
);
