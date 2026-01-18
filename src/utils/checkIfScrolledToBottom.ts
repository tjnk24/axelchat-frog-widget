import {appStateNewMessagesCountSelector} from '__selectors/appStateSelectors';
import {getStore} from '__store/configureStore';

export const checkIfScrolledToBottom = (div: HTMLDivElement) => {
    const divTargetStyle = window.getComputedStyle(div);

    const newMessagesCount = appStateNewMessagesCountSelector(getStore());

    let lastMessagesScrollHeight = 0;

    const lastMessages = Array.from(div.children).slice(Math.max(div.children.length - newMessagesCount, 0));

    lastMessages.forEach(({scrollHeight}) => {
        lastMessagesScrollHeight += scrollHeight;
    });

    return div?.scrollHeight - div?.offsetHeight - div?.scrollTop - lastMessagesScrollHeight - parseFloat(`${divTargetStyle?.gap || 0}`) < 1;
};
