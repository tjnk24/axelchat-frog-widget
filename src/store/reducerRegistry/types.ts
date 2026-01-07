import {Reducer} from '@reduxjs/toolkit';

export type RegistryReducers = {
    [key: string]: Reducer;
}

export type EmitChangeListener = (reducers: RegistryReducers) => void;

export type EmitChange = EmitChangeListener | null;
