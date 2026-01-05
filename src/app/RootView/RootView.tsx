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
    isDesktop,
    isMobileOnly,
    isTablet,
    isSmartTV,
    isMobile,
    isConsole,
    isWearable,
    isEmbedded,
    mobileVendor,
    mobileModel,
} from 'react-device-detect';
import {useSearchParams} from 'react-router-dom';
import useWebSocket, {ReadyState} from 'react-use-websocket';

import {IndicatorTypeEnum} from '__utils/types';

import packageJson from '../../../package.json';
import AnimatedDummyTextView from '../AnimatedDummyTextView';
import {MessagesListView} from '../Messages/MessageListView';
import {ServicesListView} from '../States/ServiceListView';

import style from './style.module.scss';

function getWebSocketUrl(searchParams) {
    const param = searchParams.get('ws-url');
    if (typeof param === 'string')
    {
        return param;
    }

    return 'ws://' + window.location.hostname + ':' + window.location.port + '/';
}

function getEventLogging(searchParams) {
    const param = searchParams.get('event-logging');
    if (typeof param === 'string')
    {
        return param.toLowerCase() === 'true' ? true : false;
    }

    return false;
}

function getDeviceType() {
    if (isDesktop) { return 'DESKTOP'; }
    if (isMobileOnly) {return 'MOBILE'; }
    if (isTablet) { return 'TABLET'; }
    if (isSmartTV) { return 'SMART_TV'; }
    if (isConsole) { return 'CONSOLE'; }
    if (isWearable) { return 'WEARABLE'; }
    if (isEmbedded) { return 'EMBEDDED'; }
    return 'UNKNOWN';
}

function getDeviceName() {
    if (isMobile) {
        return mobileVendor + ', ' + mobileModel;
    }

    return '';
}

const getNavigatorLanguage = () => {
    if (navigator.languages && navigator.languages.length) {
        return navigator.languages[0];
    } else {
        return navigator?.['userLanguage'] || navigator.language || navigator?.['browserLanguage'] || 'en';
    }
};

export const RootView = () => {
    const [searchParams] = useSearchParams();
    const [authorsMap] = useState(new Map());
    const [messages, setMessages] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [messagesMap, setMessagesMap] = useState(new Map());
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [services, setServices] = useState([]);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const [appState, setState] = useState({
        viewers: -1,
    });
    const [settings, setSettings] = useState({
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
    });
    const [config] = useState({
        eventsLogging: getEventLogging(searchParams),
    });

    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    const {sendMessage, lastMessage, readyState} = useWebSocket(getWebSocketUrl(searchParams), {
        onOpen: () => {
            if (config.eventsLogging) {
                console.log('Opened socket');
            }

            setMessages([]);
            sendMessage(JSON.stringify({
                type: 'HELLO',
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

    const checkIsInRange = (viewPortHeight: number) => {
        const bodyHeight = document.body.scrollHeight;

        return viewPortHeight >= bodyHeight - 40 && viewPortHeight <= bodyHeight;
    };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!lastMessage) {
            return;
        }

        const protocolMessage = JSON.parse(lastMessage.data);

        if (config.eventsLogging) {
            console.log(protocolMessage);
        }

        const protocolMessageType = protocolMessage.type;
        const data = protocolMessage.data;

        if (protocolMessageType === 'NEW_MESSAGES_RECEIVED') {
            console.log('isScrolledToBottom', isScrolledToBottom);
            handleSetIsScrolledToBottom();

            setMessages(prev => {
                prev = prev.concat(...data.messages);

                for (const message of data.messages) {
                    messagesMap.set(message.id, message);
                    const author = message.author;
                    authorsMap.set(author.id, author);
                }

                const MaxMessagesCount = 70;

                if (prev.length > MaxMessagesCount) {
                    const needToDeleteCount = prev.length - MaxMessagesCount;

                    for (let i = 0; i < needToDeleteCount; i++) {
                        const message = prev.shift();
                        messagesMap.delete(message.id);
                    }
                }

                return prev;
            });
        }
        else if (protocolMessageType === 'STATES_CHANGED') {
            setServices(data.services);
            setState(data);
        }
        else if (protocolMessageType === 'MESSAGES_CHANGED') {
            for (const message of data.messages) {
                const prevMessage = messagesMap.get(message.id);
                if (typeof(prevMessage) !== 'undefined' && prevMessage !== null) {

                    if (config.eventsLogging) {
                        console.log('changed ', prevMessage, ' to ', message);
                    }

                    Object.assign(prevMessage, message);
                }
            }
            forceUpdate();
        }
        else if (protocolMessageType === 'MESSAGES_SELECTED') {
            setSelectedMessages(() => {
                for (const message of data.messages) {
                    const author = message.author;
                    authorsMap.set(author.id, author);
                }

                return data.messages;
            });
        }
        else if (protocolMessageType === 'AUTHOR_VALUES_CHANGED') {
            const authorId = data.author_id;

            if (authorsMap.has(authorId)) {
                const author = authorsMap.get(authorId);
                for (const key in data.values) {
                    author[key] = data.values[key];
                }
            }
        }
        else if (protocolMessageType === 'NEED_RELOAD') {
            window.location.reload();
        }
        else if (protocolMessageType === 'SETTINGS_UPDATED') {
            setSettings(data.settings);
        }
        else if (protocolMessageType === 'CLEAR_MESSAGES') {
            setMessages(() => {
                messagesMap.clear();
                return [];
            });
        }
        else if (protocolMessageType === 'HELLO' ||
                 protocolMessageType === 'PONG' ||
                 protocolMessageType === 'SERVER_CLOSE') {
            // ignore
        }
        else if (protocolMessageType === 'PING') {
            sendMessage(JSON.stringify({
                type: 'PONG',
            }));
        }
        else {
            console.error('Unknown message type \'' + protocolMessageType + '\', protocol message = \'' + protocolMessage + '\'');
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage, setMessages]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting...',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed. Please launch the AxelChat or refresh the widget...',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    if (readyState === ReadyState.OPEN) {
        const widgetType = searchParams.get('widget');

        if (widgetType === 'messages') {
            return (<MessagesListView
                messages={messages}
                hideTimeout={settings.widgets.messages.hideTimeout}
                messageStyle={settings.widgets.messages.style}
                hideConnectionStatusWhenConnected={settings.widgets.hideConnectionStatusWhenConnected}
                showPlatformIcon={settings.widgets.messages.showPlatformIcon}
                isScrolledToBottom={isScrolledToBottom}
            />);
        }
        else if (widgetType === 'selected-messages') {
            return (<MessagesListView
                messages={selectedMessages}
                hideTimeout={0}
                messageStyle={settings.widgets.messages.style}
                hideConnectionStatusWhenConnected={settings.widgets.hideConnectionStatusWhenConnected}
                showPlatformIcon={settings.widgets.messages.showPlatformIcon}
                isScrolledToBottom={isScrolledToBottom}
            />);
        }
        else if (widgetType === 'states') {
            return (<ServicesListView
                services={services}
                appState={appState}
                hidePlatformIconIfCountIsUnknown={settings.widgets.states.hidePlatformIconIfCountIsUnknown}/>);
        }
        else {
            return (<span className={style.errorText}>Error: unknown widget</span>);
        }
    }
    else {
        return (
            <AnimatedDummyTextView
                type={readyState === ReadyState.CONNECTING ? IndicatorTypeEnum.Loading : IndicatorTypeEnum.Critical}
                text={connectionStatus}/>
        );
    }
};

export default RootView;
