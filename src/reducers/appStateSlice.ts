import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {getNavigatorLanguage} from '__utils/getNavigatorLanguage';
import {
    AuthorDto,
    MessageDto,
    ProtocolMessageStatesChangedData,
    SettingsDto,
} from '__utils/types';

export type AppStateSlice = {
    messages: MessageDto[];
    selectedMessages: MessageDto[];
    newMessagesCount: number;
    authors: AuthorDto[];
    statesChangedData: ProtocolMessageStatesChangedData;
    settings: SettingsDto;
    listRef: HTMLDivElement;
};

const initialState: AppStateSlice = {
    messages: [],
    selectedMessages: [],
    newMessagesCount: 0,
    authors: [],
    statesChangedData: {
        viewers: -1,
        services: [],
    },
    settings: {
        widgets: {
            messages: {
                hideTimeout: 0,
                style: {},
                showPlatformIcon: true,
                showAvatar: false,
            },
            states: {
                hidePlatformIconIfCountIsUnknown: false,
            },
            hideConnectionStatusWhenConnected: false,
        },
        locale: getNavigatorLanguage(),
    },
    listRef: null,
};

export const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState,
    reducers: {
        setMessages: (state, {payload}: PayloadAction<AppStateSlice['messages']>) => ({
            ...state,
            messages: payload,
        }),
        setSelectedMessages: (state, {payload}: PayloadAction<AppStateSlice['selectedMessages']>) => ({
            ...state,
            selectedMessages: payload,
        }),
        setAuthors: (state, {payload}: PayloadAction<AppStateSlice['authors']>) => ({
            ...state,
            authors: payload,
        }),
        setStateChangedData: (state, {payload}: PayloadAction<AppStateSlice['statesChangedData']>) => ({
            ...state,
            statesChangedData: payload,
        }),
        setSettings: (state, {payload}: PayloadAction<AppStateSlice['settings']>) => ({
            ...state,
            settings: payload,
        }),
        setListRef: (state, {payload}: PayloadAction<AppStateSlice['listRef']>) => ({
            ...state,
            listRef: payload,
        }),
        setNewMessagesCount: (state, {payload}: PayloadAction<AppStateSlice['newMessagesCount']>) => ({
            ...state,
            newMessagesCount: payload,
        }),
    },
});
