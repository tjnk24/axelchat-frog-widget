import isEmpty from 'lodash/isEmpty';
import {useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {appStateSettingsWidgetsSelector} from '__selectors/appStateSelectors';
import {IndicatorTypeEnum} from '__utils/types';

import AnimatedDummyText from '../../components/animated-dummy-text';
import Message from '../message';
import ScrollBottomButton from '../scroll-bottom-button';

import {Props} from './types';
import {checkIfScrolledToBottom} from './utils/checkIfScrolledToBottom';

import style from './style.module.scss';

const MessagesList = ({messages = []}: Props) => {
    const {hideConnectionStatusWhenConnected} = useSelector(appStateSettingsWidgetsSelector);

    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

    const internalListRef = useRef<HTMLDivElement>(null);

    const onScrollToBottomClick = () => {
        internalListRef.current.scrollTop = internalListRef.current.scrollHeight;
    };

    if (isEmpty(messages)) {
        if (hideConnectionStatusWhenConnected) {
            return null;
        }

        return (
            <AnimatedDummyText
                type={IndicatorTypeEnum.Success}
                text="Connected!"
            />
        );
    }

    return (
        <div>
            <div
                ref={internalListRef}
                className={style.list}
                // eslint-disable-next-line react/no-unknown-property
                onLoad={() => {
                    if (isScrolledToBottom || isFirstLoad) {
                        onScrollToBottomClick();

                        setIsFirstLoad(false);
                    }
                }}
                onScroll={() => setIsScrolledToBottom(checkIfScrolledToBottom(internalListRef?.current))}
            >
                {messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>

            {!isScrolledToBottom && <ScrollBottomButton onClick={onScrollToBottomClick}/>}
        </div>
    );
};

export default MessagesList;
