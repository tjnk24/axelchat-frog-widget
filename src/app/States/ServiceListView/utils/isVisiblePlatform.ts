import {ServiceDto} from '__utils/types';

export const isVisiblePlatform = (service: ServiceDto, hidePlatformIconIfCountIsUnknown: boolean) => {
    if (!service) {
        // eslint-disable-next-line no-console
        console.warn('service is null');
        return false;
    }

    if (!service.enabled) {
        return false;
    }

    if (service.viewers >= 0) {
        return true;
    }

    return !hidePlatformIconIfCountIsUnknown;
};
