import isEmpty from 'lodash/isEmpty';
import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {IndicatorTypeEnum} from '__utils/types';

import AnimatedDummyTextView from '../../AnimatedDummyTextView';
import {MessageView} from '../MessageView';
import ScrollBottomButton from '../ScrollBottomButton';

import {Props} from './types';

import style from './style.module.scss';

const MessagesListView = ({
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
            <AnimatedDummyTextView
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
                        <MessageView
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

export default MessagesListView;
