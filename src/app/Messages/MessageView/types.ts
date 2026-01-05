import {CSSProperties} from 'react';

import {MessageDto} from '__utils/types';

interface OwnProps {
    message: MessageDto;
    hideTimeout: number;
    messageStyle: CSSProperties;
    showPlatformIcon: boolean;
}

export type Props = OwnProps;
