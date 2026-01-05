import {CSSProperties} from 'react';

import {MessageDto} from '__utils/types';

interface OwnProps {
    messages: MessageDto[];
    hideTimeout?: number;
    hideConnectionStatusWhenConnected?: boolean;
    messageStyle?: CSSProperties;
    showPlatformIcon?: boolean;
    isScrolledToBottom?: boolean;
}

export type Props = OwnProps;
