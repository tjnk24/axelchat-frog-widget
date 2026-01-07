import {ReadyState} from 'react-use-websocket';

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
