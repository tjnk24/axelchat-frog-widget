import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AppStateSlice = {
    count: number;
};

const initialState: AppStateSlice = {
    count: 0,
};

export const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState,
    reducers: {
        setCount: (_state, {payload}: PayloadAction<number>) => ({count: payload}),
    },
});
