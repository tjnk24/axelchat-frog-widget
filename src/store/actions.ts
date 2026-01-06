import {appStateSlice} from '__reducers/appStateSlice';

import {bindActions} from './storeService';

export const commonActions = bindActions({
    testGlobalCounter: appStateSlice.actions,
});
