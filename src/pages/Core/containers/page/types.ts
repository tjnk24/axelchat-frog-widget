import {CSSProperties} from 'react';

export enum ProtocolMessageTypeEnum {
    NewMessagesReceived = 'NEW_MESSAGES_RECEIVED',
    StatesChanged = 'STATES_CHANGED',
    MessagesChanged = 'MESSAGES_CHANGED',
    MessagesSelected = 'MESSAGES_SELECTED',
    AuthorValuesChanged = 'AUTHOR_VALUES_CHANGED',
    NeedReload = 'NEED_RELOAD',
    SettingsUpdated = 'SETTINGS_UPDATED',
    ClearMessages = 'CLEAR_MESSAGES',
    Hello = 'HELLO',
    Ping = 'PING',
    Pong = 'PONG',
    ServerClose = 'SERVER_CLOSE',
}

export enum DeviceTypeEnum {
    Desktop = 'DESKTOP',
    Mobile = 'MOBILE',
    Tablet = 'TABLET',
    SmartTv = 'SMART_TV',
    Console = 'CONSOLE',
    Wearable = 'WEARABLE',
    Embedded = 'EMBEDDED',
    Unknown = 'UNKNOWN',
}

export enum WidgetTypeEnum {
    Messages = 'messages',
    SelectedMessages = 'selected-messages',
    States = 'states'
}

export type SettingsMessages = {
    hideTimeout: number;
    style: CSSProperties;
    showPlatformIcon: boolean;
}

export type SettingsStates = {
    hidePlatformIconIfCountIsUnknown: boolean;
}

export type SettingsWidgets = {
    messages: SettingsMessages;
    states: SettingsStates;
    hideConnectionStatusWhenConnected: boolean;
}

export type Settings = {
    widgets: SettingsWidgets;
    locale: string;
};
