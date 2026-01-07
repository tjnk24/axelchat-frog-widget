import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {SendMessage} from 'react-use-websocket';

import {commonActions} from '__store/actions';
import {ProtocolMessage, ProtocolMessageTypeEnum} from '__utils/types';

import {appService} from '../../../services/appService';
import {getEventLogging} from '../utils/getEventLogging';

const {
    AuthorValuesChanged,
    ClearMessages,
    Hello,
    MessagesChanged,
    MessagesSelected,
    NeedReload,
    NewMessagesReceived,
    Ping,
    Pong,
    ServerClose,
    SettingsUpdated,
    StatesChanged,
} = ProtocolMessageTypeEnum;

export const useProtocolMessageEffect = (lastMessage: MessageEvent, sendMessage: SendMessage) => {
    const [searchParams] = useSearchParams();

    const isEventLogging = getEventLogging(searchParams);

    useEffect(() => {
        if (!lastMessage) {
            return;
        }

        const protocolMessage: ProtocolMessage = JSON.parse(lastMessage.data);

        // eslint-disable-next-line no-console
        isEventLogging && console.log(protocolMessage);

        const {type, data} = protocolMessage || {};

        switch (type) {
            case NewMessagesReceived:
                appService.onNewMessages(data?.messages);

                break;

            case StatesChanged:
                commonActions.appState.setStateChangedData(data);

                break;
            case MessagesChanged:
                appService.onMessagesChanged(data.messages, isEventLogging);

                break;
            case MessagesSelected:
                appService.onSelectedMessages(data?.messages);

                break;
            case AuthorValuesChanged:
                appService.onAuthorValuesChanged(data);

                break;
            case NeedReload:
                window.location.reload();

                break;
            case SettingsUpdated:
                commonActions.appState.setSettings(data.settings);

                break;
            case ClearMessages:
                commonActions.appState.setMessages([]);

                break;
            case Ping:
                sendMessage(JSON.stringify({type: Pong}));

                break;
            case Hello:
            case Pong:
            case ServerClose:
                break;
            default:
                // eslint-disable-next-line no-console
                console.error(`Unknown message type \' ${type}\', protocol message = \' ${protocolMessage}\'`);

                break;
        }

    }, [isEventLogging, lastMessage, sendMessage]);
};
