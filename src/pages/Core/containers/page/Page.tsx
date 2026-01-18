import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import {ReadyState} from 'react-use-websocket';

import {appStateSelector} from '__selectors/appStateSelectors';
import {IndicatorTypeEnum, WidgetTypeEnum} from '__utils/types';

import AnimatedDummyText from '../../components/animated-dummy-text';
import MessageListContainer from '../message-list-container';
import ServicesList from '../service-list';

import {CONNECTION_STATUS_WORDINGS} from './consts';
import {useEnhancedWebSocket} from './hooks/useEnhancedWebSocket';
import {useProtocolMessageEffect} from './hooks/useProtocolMessageEffect';

import style from './style.module.scss';

const {
    Messages,
    SelectedMessages,
    States,
} = WidgetTypeEnum;

const {Loading, Critical} = IndicatorTypeEnum;

const Page = () => {
    const {messages, selectedMessages} = useSelector(appStateSelector);

    const [searchParams] = useSearchParams();

    const {lastMessage, sendMessage, readyState} = useEnhancedWebSocket();

    useProtocolMessageEffect(lastMessage, sendMessage);

    const widget = useMemo(() => {
        const widgetType = searchParams.get('widget');

        switch (widgetType) {
            case Messages:
                return <MessageListContainer messages={messages}/>;

            case SelectedMessages:
                return <MessageListContainer messages={selectedMessages}/>;
            case States:
                return <ServicesList/>;
            default:
                return <span className={style.errorText}>Error: unknown widget</span>;
        }
    }, [messages, searchParams, selectedMessages]);

    if (readyState === ReadyState.OPEN) {
        return widget;
    }

    return (
        <AnimatedDummyText
            type={readyState === ReadyState.CONNECTING ? Loading : Critical}
            text={CONNECTION_STATUS_WORDINGS[readyState]}
        />
    );
};

export default Page;
