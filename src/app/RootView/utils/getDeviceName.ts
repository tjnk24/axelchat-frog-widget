import {
    isMobile,
    mobileModel,
    mobileVendor,
} from 'react-device-detect';

export const getDeviceName = () => isMobile ? `${mobileVendor}, ${mobileModel}` : '';
