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
    authors: AuthorDto[];
    statesChangedData: ProtocolMessageStatesChangedData;
    settings: SettingsDto;
};

const initialState: AppStateSlice = {
    messages: [],
    selectedMessages: [],
    authors: [],
    statesChangedData: {
        viewers: -1,
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
};

export const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState,
    reducers: {
        setMessages: (state, {payload}: PayloadAction<MessageDto[]>) => ({
            ...state,
            messages: payload,
        }),
        setSelectedMessages: (state, {payload}: PayloadAction<MessageDto[]>) => ({
            ...state,
            selectedMessages: payload,
        }),
        setAuthors: (state, {payload}: PayloadAction<AuthorDto[]>) => ({
            ...state,
            authors: payload,
        }),
        setStateChangedData: (state, {payload}: PayloadAction<ProtocolMessageStatesChangedData>) => ({
            ...state,
            statesChangedData: payload,
        }),
        setSettings: (state, {payload}: PayloadAction<SettingsDto>) => ({
            ...state,
            settings: payload,
        }),
    },
});
