import cn from 'classnames';
import {useMemo} from 'react';

import apiOutlined from '__images/api-outlined.svg';
import checkCircleOutlined from '__images/check-circle.svg';
import loadingOutlined from '__images/loading.svg';
import {IndicatorTypeEnum} from '__utils/types';

import {Props} from './types';

import style from './style.module.scss';

const {
    Critical,
    Loading,
    Success,
} = IndicatorTypeEnum;

const AnimatedDummyText = ({text = 'TEXT', type = Loading}: Props) => {
    const icon = useMemo(() => {
        switch (type) {
            case Loading:
                return (
                    <img
                        className={cn(style.icon, style.iconLoading)}
                        src={loadingOutlined}
                        alt="loading"
                    />
                );

            case Success:
                return (
                    <img
                        className={style.icon}
                        src={checkCircleOutlined}
                        alt="check"
                    />
                );

            case Critical:
                return (
                    <img
                        className={style.icon}
                        src={apiOutlined}
                        alt="api"
                    />
                );

            default:
                break;
        }
    }, [type]);

    return (
        <div className={style.root}>
            {icon}

            <span className={style.text}>
                {text}
            </span>
        </div>
    );
};

export default AnimatedDummyText;
