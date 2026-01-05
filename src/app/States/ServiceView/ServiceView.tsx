import PropTypes from 'prop-types';
import {Component} from 'react';

import style from './style.modele.scss';

export class ServiceView extends Component {
    static propTypes = {
        service: PropTypes.object.isRequired,
    };

    static defaultProps = {
        service: null,
    };

    static props: Record<string, unknown> = {};

    render() {
        const service = this.props?.['service'];

        if (!service) {
            return (
                <div>null</div>
            );
        }

        return (
            <span className={style.serviceIndicator} style={{whiteSpace: 'nowrap'}}>
                <img
                    className={style.bigBadgeServiceIcon}
                    alt=""
                    src={service?.['icon']}
                />

                <span className={style.bigText}>{service?.['viewers'] !== -1 ? service?.['viewers'].toLocaleString() : ''}</span>
            </span>
        );
    }
}
