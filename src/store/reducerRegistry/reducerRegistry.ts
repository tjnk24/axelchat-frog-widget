import {reducers} from '__reducers';

import {
    EmitChange,
    EmitChangeListener,
    RegistryReducers,
} from './types';

class ReducerRegistry {
    emitChange: EmitChange = null;

    reducers: RegistryReducers = reducers;

    public register = (newReducers: RegistryReducers) => {
        this.reducers = {...this.reducers, ...newReducers};

        if (this.emitChange) {
            this.emitChange(this.reducers);
        }
    };

    public unregister = (unregisterReducers: RegistryReducers) => {
        const newReducers: RegistryReducers = {};

        const unregisterKeys = Object.keys(unregisterReducers);
        const filteredKeys = Object.keys(this.reducers).filter(key => !unregisterKeys.includes(key));

        filteredKeys.forEach(key => {
            newReducers[key] = this.reducers[key];
        });

        this.reducers = newReducers;

        if (this.emitChange) {
            this.emitChange(this.reducers);
        }
    };

    public setChangeListener = (listener: EmitChangeListener) => {
        this.emitChange = listener;
    };
}

export default new ReducerRegistry();
