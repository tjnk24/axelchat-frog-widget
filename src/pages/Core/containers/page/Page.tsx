/* eslint-disable no-console */
import {useEffect} from 'react';
import {
    osName,
    osVersion,
    browserName,
    fullBrowserVersion,
} from 'react-device-detect';
import {useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import useWebSocket, {ReadyState} from 'react-use-websocket';

import {appStateSelector} from '__selectors/appStateSelectors';
import {commonActions} from '__store/actions';
import {
    IndicatorTypeEnum,
    ProtocolMessage,
    ProtocolMessageTypeEnum,
    WidgetTypeEnum,
} from '__utils/types';

import packageJson from '../../../../../package.json';
import AnimatedDummyText from '../../components/animated-dummy-text';
import {appService} from '../../services/appService';
import MessagesList from '../message-list';
import ServicesList from '../service-list';

import {CONNECTION_STATUS_WORDINGS} from './consts';
import {getDeviceName} from './utils/getDeviceName';
import {getDeviceType} from './utils/getDeviceType';
import {getEventLogging} from './utils/getEventLogging';
import {getWebSocketUrl} from './utils/getWebsocketUrl';

import style from './style.module.scss';

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

const {
    Messages,
    SelectedMessages,
    States,
} = WidgetTypeEnum;

const {Loading, Critical} = IndicatorTypeEnum;

const Page = () => {
    const {messages, selectedMessages} = useSelector(appStateSelector);

    const [searchParams] = useSearchParams();

    const isEventLogging = getEventLogging(searchParams);

    const {sendMessage, lastMessage, readyState} = useWebSocket(getWebSocketUrl(searchParams), {
        onOpen: () => {
            isEventLogging && console.log('Opened socket');

            sendMessage(JSON.stringify({
                type: Hello,
                data: {
                    client: {
                        type: 'MAIN_WEBSOCKETCLIENT',
                        name: packageJson.name,
                        version: packageJson.version,
                        device: {
                            type: getDeviceType(),
                            name: getDeviceName(),
                            os: {
                                name: osName,
                                version: osVersion,
                            },
                            browser: {
                                name: browserName,
                                version: fullBrowserVersion,
                            },
                        },
                    },
                    info: {
                        type: 'WIDGET',
                        name: searchParams.get('widget'),
                    },
                },
            }));
        },
        shouldReconnect: () => true,
    });

    useEffect(() => {
        if (!lastMessage) {
            return;
        }

        const protocolMessage: ProtocolMessage = JSON.parse(lastMessage.data);

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
                console.error(`Unknown message type \' ${type}\', protocol message = \' ${protocolMessage}\'`);

                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage]);

    if (readyState === ReadyState.OPEN) {
        const widgetType = searchParams.get('widget');

        switch (widgetType) {
            case Messages:
                return <MessagesList messages={messages}/>;

            case SelectedMessages:
                return <MessagesList messages={selectedMessages}/>;
            case States:
                return <ServicesList/>;
            default:
                return <span className={style.errorText}>Error: unknown widget</span>;
        }
    }

    return (
        <AnimatedDummyText
            type={readyState === ReadyState.CONNECTING ? Loading : Critical}
            text={CONNECTION_STATUS_WORDINGS[readyState]}
        />
    );
};

export default Page;
