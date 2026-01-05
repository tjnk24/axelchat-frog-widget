
import PropTypes from 'prop-types';
import {Component} from 'react';

import {ServiceView} from '../ServiceView';

import style from './style.module.scss';

function getTotalViewersView(viewers, enabledSourcesCount) {
    if (enabledSourcesCount === 1) {
        return null;
    }

    return (
        <span className={style.serviceIndicator} style={{whiteSpace: 'nowrap'}}>
            <img className={style.bigBadgeServiceIcon} alt=""
                src="./images/person.svg"/>

            <span className={style.bigText}>{viewers > -1 ? viewers.toLocaleString() : '?'}</span>
        </span>
    );
}

function isVisiblePlatform(service, hidePlatformIconIfCountIsUnknown) {
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
}

function getVisiblePlatformsCount(services, hidePlatformIconIfCountIsUnknown) {
    let result = 0;
    for (let i = 0; i < services.length; i++) {
        if (isVisiblePlatform(services[i], hidePlatformIconIfCountIsUnknown)) {
            result++;
        }
    }
    return result;
}

function getPlatformDisplayStyle(service, hidePlatformIconIfCountIsUnknown) {
    if (isVisiblePlatform(service, hidePlatformIconIfCountIsUnknown)) {
        return 'inherit';
    }

    return 'none';
}

export class ServicesListView extends Component {
    static propTypes = {
        services: PropTypes.array.isRequired,
        appState: PropTypes.object.isRequired,
        hidePlatformIconIfCountIsUnknown: PropTypes.bool,
    };

    static defaultProps = {
        services: [],
        appState: null,
        hidePlatformIconIfCountIsUnknown: false,
    };

    static props: Record<string, unknown> = {};

    render() {
        const appState = this.props?.['appState'];
        const services = this.props?.['services'];
        const hidePlatformIconIfCountIsUnknown = this.props?.['hidePlatformIconIfCountIsUnknown'];
        const visibleCount = getVisiblePlatformsCount(services, hidePlatformIconIfCountIsUnknown);

        return (
            <span>
                {services.map((service, idx) => (
                    <span key={idx} style={{display: getPlatformDisplayStyle(service, hidePlatformIconIfCountIsUnknown)}}>
                        <ServiceView
                            service={service}
                        />
                    </span>
                ))}

                {getTotalViewersView(appState.viewers, visibleCount)}
            </span>
        );
    }
}
