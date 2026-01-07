import isEmpty from 'lodash/isEmpty';

import {Props} from './types';

import style from './style.modele.scss';

const Service = ({service, isVisiblePlatform}: Props) => {
    if (isEmpty(service)) {
        return (
            <div>null</div>
        );
    }

    const {icon, viewers} = service || {};

    return (
        <span style={{display: isVisiblePlatform ? 'inherit' : 'none'}}>
            <span className={style.serviceIndicator}>
                <img
                    className={style.bigBadgeServiceIcon}
                    alt="service icon"
                    src={icon}
                />

                <span className={style.bigText}>
                    {viewers !== -1 ? viewers.toLocaleString() : ''}
                </span>
            </span>
        </span>
    );
};

export default Service;
