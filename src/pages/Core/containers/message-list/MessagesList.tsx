import isEmpty from 'lodash/isEmpty';
import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {IndicatorTypeEnum} from '__utils/types';

import AnimatedDummyText from '../../components/animated-dummy-text';
import Message from '../message';
import ScrollBottomButton from '../scroll-bottom-button';

import {Props} from './types';

import style from './style.module.scss';

const MessagesList = ({
    hideConnectionStatusWhenConnected,
    isScrolledToBottom,
    messageStyle,
    messages = [],
    showPlatformIcon = true,
    hideTimeout = 0,
}: Props) => {
    const [messagesEnd, setMessagesEnd] = useState<HTMLDivElement>();

    const scrollToBottom = useCallback(() => {
        if (
            messagesEnd !== undefined
            && messagesEnd !== null
            && isScrolledToBottom
        ) {
            messagesEnd.scrollIntoView({behavior: 'smooth'});
        }
    }, [isScrolledToBottom, messagesEnd]);

    const onScrollToBottomClick = () => {
        messagesEnd.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [scrollToBottom]);

    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }

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
            <div className={style.list}>
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={style.messageViewContainer}
                    >
                        <Message
                            message={message}
                            messageStyle={messageStyle}
                            hideTimeout={hideTimeout}
                            showPlatformIcon={showPlatformIcon}
                        />
                    </div>
                ))}
            </div>

            <div
                className={style.messagesEnd}
                ref={element => {
                    setMessagesEnd(element);
                }}
            ></div>

            {
                messagesEnd !== undefined
                && messagesEnd !== null
                && !isScrolledToBottom &&
                <ScrollBottomButton onClick={onScrollToBottomClick}/>
            }
        </div>
    );
};

export default MessagesList;
