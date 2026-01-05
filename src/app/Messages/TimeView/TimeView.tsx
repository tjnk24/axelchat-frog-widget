import {Props} from './types';

import style from './style.module.scss';

const TimeView = ({timeIso}: Props) => {
    return (
        <span>
            <span className={style.time}>
                {new Date(timeIso).toLocaleTimeString()}
            </span>
        </span>
    );
};

export default TimeView;
