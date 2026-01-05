import {ReadyState} from 'react-use-websocket';

import {Settings} from './types';
import {getNavigatorLanguage} from './utils/getNavigatorLanguage';

const {
    CLOSED,
    CLOSING,
    CONNECTING,
    OPEN,
    UNINSTANTIATED,
} = ReadyState;

export const CONNECTION_STATUS_WORDINGS = {
    [CONNECTING]: 'Connecting...',
    [OPEN]: 'Open',
    [CLOSING]: 'Closing',
    [CLOSED]: 'Closed. Please launch the AxelChat or refresh the widget...',
    [UNINSTANTIATED]: 'Uninstantiated',
};

export const DEFAULT_SETTINGS: Settings = {
    widgets: {
        messages: {
            hideTimeout: 0,
            style: {},
            showPlatformIcon: true,
        },
        states: {
            hidePlatformIconIfCountIsUnknown: false,
        },
        hideConnectionStatusWhenConnected: false,
    },
    locale: getNavigatorLanguage(),
};

export const MESSAGES_MAP = new Map();

export const AUTHORS_MAP = new Map();
