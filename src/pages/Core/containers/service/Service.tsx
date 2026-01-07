import isEmpty from 'lodash/isEmpty';

import {Props} from './types';

import style from './style.module.scss';

const Service = ({service, isVisiblePlatform}: Props) => {
    if (isEmpty(service)) {
        return (
            <div>null</div>
        );
    }

    if (!isVisiblePlatform) {
        return null;
    }

    const {icon, viewers} = service || {};

    return (
        <div className={style.serviceIndicator}>
            <img
                className={style.bigBadgeServiceIcon}
                alt="service icon"
                src={icon}
            />

            <span className={style.bigText}>
                {viewers !== -1 ? viewers.toLocaleString() : ''}
            </span>
        </div>
    );
};

export default Service;
