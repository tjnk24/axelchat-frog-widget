import {ServiceDto} from '__utils/types';

import {isVisiblePlatform} from './isVisiblePlatform';

export const getVisiblePlatformsCount = (services: ServiceDto[] = [], hidePlatformIconIfCountIsUnknown: boolean) => {
    let result = 0;

    services.forEach(service => {
        if (isVisiblePlatform(service, hidePlatformIconIfCountIsUnknown)) {
            result++;
        }
    });

    return result;
};
