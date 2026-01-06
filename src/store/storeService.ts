import {bindActionCreators} from '@reduxjs/toolkit';

import {store} from './configureStore';

export const bindActions = <A>(actions: A): A => {
    return Object.keys(actions).reduce((result, key) => {
        const subObj = actions[key];
        return {
            ...result,
            [key]: typeof subObj === 'function'
                ? bindActionCreators(subObj, store.dispatch as never)
                : bindActions(subObj),
        };
    }, {} as A);
};
