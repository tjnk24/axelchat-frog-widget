import cn from 'classnames';
import {useMemo} from 'react';

import apiOutlined from '__images/api-outlined.svg';
import checkCircleOutlined from '__images/check-circle.svg';
import loadingOutlined from '__images/loading.svg';
import {IndicatorTypeEnum} from '__utils/types';

import {Props} from './types';

import style from './style.module.scss';

const AnimatedDummyTextView = ({text = 'TEXT', type = IndicatorTypeEnum.Loading}: Props) => {
    const icon = useMemo(() => {
        switch (type) {
            case IndicatorTypeEnum.Loading:
                return (
                    <img
                        className={cn(style.icon, style.iconLoading)}
                        src={loadingOutlined}
                        alt="loading"
                    />
                );

            case IndicatorTypeEnum.Success:
                return (
                    <img
                        className={style.icon}
                        src={checkCircleOutlined}
                        alt="check"
                    />
                );

            case IndicatorTypeEnum.Critical:
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
        <>
            {icon}

            <span className={style.text}>
                {text}
            </span>
        </>
    );
};

export default AnimatedDummyTextView;
