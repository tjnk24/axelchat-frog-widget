import {useMemo} from 'react';

import ServiceView from '../service';

import {Props} from './types';
import {getVisiblePlatformsCount} from './utils/getVisiblePlatformsCount';
import {isVisiblePlatform} from './utils/isVisiblePlatform';

import style from './style.module.scss';

const ServicesList = ({
    appState,
    hidePlatformIconIfCountIsUnknown,
    services = [],
}: Props) => {
    const totalViewersView = useMemo(() => {
        const enabledSourcesCount = getVisiblePlatformsCount(services, hidePlatformIconIfCountIsUnknown);

        if (enabledSourcesCount === 1) {
            return null;
        }

        const {viewers} = appState || {};

        return (
            <span className={style.serviceIndicator}>
                <img
                    className={style.bigBadgeServiceIcon}
                    alt="big badge service icon"
                    src="./images/person.svg"
                />

                <span className={style.bigText}>
                    {viewers > -1 ? viewers.toLocaleString() : '?'}
                </span>
            </span>
        );
    }, [appState, hidePlatformIconIfCountIsUnknown, services]);

    return (
        <span>
            {services.map((service, idx) => (
                <span
                    key={idx}
                    style={{display: isVisiblePlatform(service, hidePlatformIconIfCountIsUnknown) ? 'inherit' : 'none'}}
                >
                    <ServiceView service={service}/>
                </span>
            ))}

            {totalViewersView}
        </span>
    );
};

export default ServicesList;
