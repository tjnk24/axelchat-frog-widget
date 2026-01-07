import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {appStateSettingsWidgetsStatesSelector, appStateStatesChangedDataSelector} from '__selectors/appStateSelectors';

import ServiceView from '../service';

import {getVisiblePlatformsCount} from './utils/getVisiblePlatformsCount';
import {isVisiblePlatform} from './utils/isVisiblePlatform';

import style from './style.module.scss';

const ServicesList = () => {
    const {services, viewers} = useSelector(appStateStatesChangedDataSelector);
    const {hidePlatformIconIfCountIsUnknown} = useSelector(appStateSettingsWidgetsStatesSelector);

    const totalViewersView = useMemo(() => {
        const enabledSourcesCount = getVisiblePlatformsCount(services, hidePlatformIconIfCountIsUnknown);

        if (enabledSourcesCount === 1) {
            return null;
        }

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
    }, [hidePlatformIconIfCountIsUnknown, services, viewers]);

    return (
        <span>
            {services.map((service, index) => (
                <ServiceView
                    key={index}
                    service={service}
                    isVisiblePlatform={isVisiblePlatform(service, hidePlatformIconIfCountIsUnknown)}
                />
            ))}

            {totalViewersView}
        </span>
    );
};

export default ServicesList;
