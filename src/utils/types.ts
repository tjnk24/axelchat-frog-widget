import {CSSProperties} from 'react';

export enum IndicatorTypeEnum {
    TextOnly = 'TextOnly',
    Success = 'Success',
    Loading = 'Loading',
    Critical = 'Critical',
};

export type AuthorTagDto = {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
};

export type AuthorDto = {
    avatar?: string;
    color?: string;
    customBackgroundColor?: string;
    id: string;
    leftBadges?: string[];
    leftTags?: AuthorTagDto[];
    name?: string;
    pageUrl?: string;
    rightBadges?: string[];
    rightTags?: AuthorTagDto[];
    serviceBadge: string;
    serviceId: string;
}

export type ForcedColorsDto = {
    bodyBackground?: string;
    bodyBorder?: string;
};

export enum MessageContentTypeEnum {
    Text = 'text',
    Image = 'image',
    Hyperlink = 'hyperlink',
    Html = 'html'
}

export type ContentDataDto = {
    text?: string;
    url?: string;
    html?: string;
}

export type ContentDto = {
    data: ContentDataDto;
    htmlClassName?: string;
    style?: Record<string, string>;
    type: MessageContentTypeEnum;
}

export type BodyStyleDto = {
    backgroundColor?: string;
    borderColor?: string;
    sideLineColor?: string;
}

export type MessageDto = {
    author: AuthorDto;
    bodyStyle: BodyStyleDto;
    contents?: ContentDto[];
    customAuthorAvatarUrl?: string;
    customAuthorName?: string;
    deleteOnPlatform?: boolean;
    edited?: boolean;
    eventType?: string;
    id: string;
    markedAsDeleted?: boolean;
    mentionedYouAs?: string;
    multiline?: boolean;
    publishedAt?: string;
    raw?: Record<string, unknown>;
    rawType?: string;
    receivedAt?: string;
    reply?: unknown;
};

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

export type HelloDataServiceDto = {
    icon?: string;
    name?: string;
    type_id?: string;
}

export type ProtocolMessageHelloData = {
    app_locale?: string;
    app_name?: string;
    app_version?: string;
    client_uuid?: string;
    services?: HelloDataServiceDto[];
}

export type ProtocolMessageHello = {
    type?: ProtocolMessageTypeEnum.Hello;
    data?: ProtocolMessageHelloData;
};

export type SettingsMessages = {
    hideTimeout: number;
    showAvatar: boolean;
    showPlatformIcon: boolean;
    style: CSSProperties;
}

export type SettingsStates = {
    hidePlatformIconIfCountIsUnknown: boolean;
}

export type SettingsWidgets = {
    messages: SettingsMessages;
    states: SettingsStates;
    hideConnectionStatusWhenConnected: boolean;
}

export type SettingsDto = {
    widgets: SettingsWidgets;
    locale: string;
};

export type ProtocolMessageSettingsUpdatedData = {
    settings?: SettingsDto;
};

export type ProtocolMessageSettingsUpdated = {
    type?: ProtocolMessageTypeEnum.SettingsUpdated;
    data?: ProtocolMessageSettingsUpdatedData;
};

export type ServiceDto = {
    connection_state?: string;
    enabled?: boolean;
    icon?: string;
    type_id?: string;
    viewers?: number;
}

export type ProtocolMessageStatesChangedData = {
    services?: ServiceDto[];
    viewers?: number;
}

export type ProtocolMessageStatesChanged = {
    type: ProtocolMessageTypeEnum.StatesChanged;
    data?: ProtocolMessageStatesChangedData;
};

export type ProtocolMessageMessagesSelectedData = {
    messages: MessageDto[];
};

export type ProtocolMessageMessagesSelected = {
    type?: ProtocolMessageTypeEnum.MessagesSelected;
    data: ProtocolMessageMessagesSelectedData;
};

export type ProtocolMessageNewMessageReceivedData = {
    messages?: MessageDto[];
};

export type ProtocolMessageNewMessageReceived = {
    type?: ProtocolMessageTypeEnum.NewMessagesReceived;
    data: ProtocolMessageNewMessageReceivedData;
};

export type ProtocolMessagePing = {
    type?: ProtocolMessageTypeEnum.Ping;
    data: null;
};

export type ProtocolMessagePong = {
    type?: ProtocolMessageTypeEnum.Pong;
    data: null;
};

export type ProtocolMessageNeedReload = {
    type?: ProtocolMessageTypeEnum.NeedReload;
    data: null;
};

export type ProtocolMessageClearMessages = {
    type?: ProtocolMessageTypeEnum.ClearMessages;
    data: null;
};

export type ProtocolMessageMessagesChangedData = {
    messages: MessageDto[];
};

export type ProtocolMessageMessagesChanged = {
    type?: ProtocolMessageTypeEnum.MessagesChanged;
    data: ProtocolMessageMessagesChangedData;
};
export type ProtocolMessageAuthorValuesChangedData = {
    author_id?: string;
    values?: Record<string, unknown>;
};

export type ProtocolMessageAuthorValuesChanged = {
    type?: ProtocolMessageTypeEnum.AuthorValuesChanged;
    data: ProtocolMessageAuthorValuesChangedData;
};

export type ProtocolMessage =
    ProtocolMessageHello
    | ProtocolMessageNewMessageReceived
    | ProtocolMessageMessagesSelected
    | ProtocolMessageStatesChanged
    | ProtocolMessageSettingsUpdated
    | ProtocolMessagePing
    | ProtocolMessagePong
    | ProtocolMessageMessagesChanged
    | ProtocolMessageNeedReload
    | ProtocolMessageClearMessages
    | ProtocolMessageAuthorValuesChanged;
