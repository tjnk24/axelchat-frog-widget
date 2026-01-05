/* eslint-disable no-console */
import {
    useState,
    useEffect,
    useCallback,
} from 'react';
import {
    osName,
    osVersion,
    browserName,
    fullBrowserVersion,
} from 'react-device-detect';
import {useSearchParams} from 'react-router-dom';
import useWebSocket, {ReadyState} from 'react-use-websocket';

import {IndicatorTypeEnum} from '__utils/types';

import packageJson from '../../../package.json';
import AnimatedDummyTextView from '../AnimatedDummyTextView';
import MessagesListView from '../Messages/MessageListView';
import ServicesListView from '../States/ServiceListView';

import {
    AUTHORS_MAP,
    CONNECTION_STATUS_WORDINGS,
    DEFAULT_SETTINGS,
    MESSAGES_MAP,
} from './consts';
import {
    ProtocolMessageTypeEnum,
    Settings,
    WidgetTypeEnum,
} from './types';
import {checkIsInRange} from './utils/checkIsInRange';
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

export const RootView = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [services, setServices] = useState([]);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const [appState, setState] = useState({viewers: -1});
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

    const [searchParams] = useSearchParams();

    const isEventLogging = getEventLogging(searchParams);

    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    const {sendMessage, lastMessage, readyState} = useWebSocket(getWebSocketUrl(searchParams), {
        onOpen: () => {
            if (isEventLogging) {
                console.log('Opened socket');
            }

            setMessages([]);

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

    const handleSetIsScrolledToBottom = () => {
        const scrolledToBottom = checkIsInRange(window.pageYOffset + window.innerHeight);
        console.log('window.pageYOffset + window.innerHeight', window.pageYOffset + window.innerHeight);
        console.log('document.body.scrollHeight', document.body.scrollHeight);
        console.log('scrolledToBottom', scrolledToBottom);

        setIsScrolledToBottom(scrolledToBottom);
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            console.log('resized');
            handleSetIsScrolledToBottom();
        }, true);

        document.addEventListener('scroll', () => {
            console.log('scroll');
            handleSetIsScrolledToBottom();
        });

        return () => {
            window.removeEventListener('resize', handleSetIsScrolledToBottom);
            document.removeEventListener('scroll', handleSetIsScrolledToBottom);
        };

    }, []);

    useEffect(() => {
        if (!lastMessage) {
            return;
        }

        const protocolMessage = JSON.parse(lastMessage.data);

        if (isEventLogging) {
            console.log(protocolMessage);
        }

        const protocolMessageType = protocolMessage.type;
        const data = protocolMessage.data;

        switch (protocolMessageType) {
            case NewMessagesReceived:
                console.log('isScrolledToBottom', isScrolledToBottom);
                handleSetIsScrolledToBottom();

                setMessages(prev => {
                    prev = prev.concat(...data.messages);

                    for (const message of data.messages) {
                        MESSAGES_MAP.set(message.id, message);
                        const author = message.author;
                        AUTHORS_MAP.set(author.id, author);
                    }

                    const MaxMessagesCount = 70;

                    if (prev.length > MaxMessagesCount) {
                        const needToDeleteCount = prev.length - MaxMessagesCount;

                        for (let i = 0; i < needToDeleteCount; i++) {
                            const message = prev.shift();
                            MESSAGES_MAP.delete(message.id);
                        }
                    }

                    return prev;
                });

                break;

            case StatesChanged:
                setServices(data.services);
                setState(data);

                break;
            case MessagesChanged:
                for (const message of data.messages) {
                    const prevMessage = MESSAGES_MAP.get(message.id);
                    if (typeof(prevMessage) !== 'undefined' && prevMessage !== null) {

                        if (isEventLogging) {
                            console.log('changed ', prevMessage, ' to ', message);
                        }

                        Object.assign(prevMessage, message);
                    }
                }

                forceUpdate();

                break;
            case MessagesSelected:
                setSelectedMessages(() => {
                    for (const message of data.messages) {
                        const author = message.author;
                        AUTHORS_MAP.set(author.id, author);
                    }

                    return data.messages;
                });

                break;
            case AuthorValuesChanged:
                if (AUTHORS_MAP.has(data.author_id)) {
                    const author = AUTHORS_MAP.get(data.author_id);
                    for (const key in data.values) {
                        author[key] = data.values[key];
                    }
                }

                break;
            case NeedReload:
                window.location.reload();

                break;
            case SettingsUpdated:
                setSettings(data.settings);

                break;
            case ClearMessages:
                setMessages(() => {
                    MESSAGES_MAP.clear();
                    return [];
                });

                break;
            case Hello:
            case Pong:
            case ServerClose:
                break;
            case Ping:
                sendMessage(JSON.stringify({type: Pong}));

                break;
            default:
                console.error(`Unknown message type \' ${protocolMessageType}\', protocol message = \' ${protocolMessage}\'`);

                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage, setMessages]);

    if (readyState === ReadyState.OPEN) {
        const widgetType = searchParams.get('widget');

        switch (widgetType) {
            case Messages:
                return (
                    <MessagesListView
                        messages={messages}
                        hideTimeout={settings.widgets.messages.hideTimeout}
                        messageStyle={settings.widgets.messages.style}
                        hideConnectionStatusWhenConnected={settings.widgets.hideConnectionStatusWhenConnected}
                        showPlatformIcon={settings.widgets.messages.showPlatformIcon}
                        isScrolledToBottom={isScrolledToBottom}
                    />
                );

            case SelectedMessages:
                return (
                    <MessagesListView
                        messages={selectedMessages}
                        hideTimeout={0}
                        messageStyle={settings.widgets.messages.style}
                        hideConnectionStatusWhenConnected={settings.widgets.hideConnectionStatusWhenConnected}
                        showPlatformIcon={settings.widgets.messages.showPlatformIcon}
                        isScrolledToBottom={isScrolledToBottom}
                    />
                );
            case States:
                return (
                    <ServicesListView
                        services={services}
                        appState={appState}
                        hidePlatformIconIfCountIsUnknown={settings.widgets.states.hidePlatformIconIfCountIsUnknown}
                    />
                );
            default:
                return <span className={style.errorText}>Error: unknown widget</span>;
        }
    }

    return (
        <AnimatedDummyTextView
            type={readyState === ReadyState.CONNECTING ? IndicatorTypeEnum.Loading : IndicatorTypeEnum.Critical}
            text={CONNECTION_STATUS_WORDINGS[readyState]}
        />
    );
};

export default RootView;
