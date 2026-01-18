import {
    useEffect,
    useRef,
    useState,
} from 'react';

import arrowUp from '__images/arrow-down.svg';
import {commonActions} from '__store/actions';
import {checkIfScrolledToBottom} from '__utils/checkIfScrolledToBottom';

import Message from '../message';

import {Props} from './types';
import {checkIfScrolledToBottomOnScroll} from './utils/checkIfScrolledToBottomOnScroll';

import style from './style.module.scss';

const MessageList = ({messages = []}: Props) => {
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const internalListRef = useRef<HTMLDivElement>(null);

    const onScrollToBottomClick = () => {
        internalListRef.current.scrollTop = internalListRef.current.scrollHeight;
    };

    useEffect(() => {
        const listRefCurrent = internalListRef?.current;

        if (isFirstLoad && listRefCurrent) {
            commonActions.appState.setListRef(listRefCurrent);

            const resizeObserver = new ResizeObserver(([{target}]) => {
                const divTarget = target as HTMLDivElement;

                const isScrolledToBottom = checkIfScrolledToBottom(divTarget);

                if (isScrolledToBottom) {
                    divTarget.scrollTop = divTarget.scrollHeight;
                }
            });

            const mutationObserver = new MutationObserver(([{target}]) => {
                const divTarget = target as HTMLDivElement;

                const isScrolledToBottom = checkIfScrolledToBottom(divTarget);

                if (isScrolledToBottom) {
                    divTarget.scrollTop = divTarget.scrollHeight;
                }
            });

            resizeObserver.observe(listRefCurrent);
            mutationObserver.observe(listRefCurrent, {childList: true, subtree: true});

            setIsFirstLoad(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [internalListRef?.current, isFirstLoad]);

    return (
        <div>
            <div
                id="messagesList"
                ref={internalListRef}
                className={style.list}
                onScroll={() => setIsScrolledToBottom(checkIfScrolledToBottomOnScroll(internalListRef.current))}
            >
                {messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>

            {!isScrolledToBottom && (
                <div className={style.buttonContainer}>
                    <button
                        onClick={onScrollToBottomClick}
                        className={style.button}
                    >
                        <img
                            className={style.icon}
                            src={arrowUp}
                            alt="arrow-up icon"
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MessageList;
