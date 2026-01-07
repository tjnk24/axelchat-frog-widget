import {
    isDesktop,
    isMobileOnly,
    isTablet,
    isSmartTV,
    isConsole,
    isWearable,
    isEmbedded,
} from 'react-device-detect';

import {DeviceTypeEnum} from '__utils/types';

const {
    Desktop,
    Mobile,
    Tablet,
    SmartTv,
    Console,
    Wearable,
    Embedded,
    Unknown,
} = DeviceTypeEnum;

export const getDeviceType = () => {
    if (isDesktop) {
        return Desktop;
    }

    if (isMobileOnly) {
        return Mobile;
    }

    if (isTablet) {
        return Tablet;
    }

    if (isSmartTV) {
        return SmartTv;
    }

    if (isConsole) {
        return Console;
    }

    if (isWearable) {
        return Wearable;
    }

    if (isEmbedded) {
        return Embedded;
    }

    return Unknown;
};
