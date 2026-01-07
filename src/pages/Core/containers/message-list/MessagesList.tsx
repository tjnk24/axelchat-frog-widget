import isEmpty from 'lodash/isEmpty';
import {useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {
    appStateIsScrolledToBottomSelector,
    appStateListRefSelector,
    appStateSettingsWidgetsSelector,
} from '__selectors/appStateSelectors';
import {commonActions} from '__store/actions';
import {IndicatorTypeEnum} from '__utils/types';

import AnimatedDummyText from '../../components/animated-dummy-text';
import Message from '../message';
import ScrollBottomButton from '../scroll-bottom-button';

import {Props} from './types';

import style from './style.module.scss';

const MessagesList = ({messages = []}: Props) => {
    const {hideConnectionStatusWhenConnected} = useSelector(appStateSettingsWidgetsSelector);
    const listRef = useSelector(appStateListRefSelector);
    const isScrolledToBottom = useSelector(appStateIsScrolledToBottomSelector);

    const [isFirstLoad, setIsFirstLoad] = useState(true);

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
                    !listRef && commonActions.appState.setListRef(internalListRef?.current);

                    if (isScrolledToBottom || isFirstLoad) {
                        onScrollToBottomClick();

                        setIsFirstLoad(false);
                    }
                }}
            >
                {messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>

            <ScrollBottomButton onClick={onScrollToBottomClick}/>
        </div>
    );
};

export default MessagesList;
