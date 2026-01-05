import arrowUp from '__images/arrow-down.svg';

import {Props} from './types';

import style from './style.module.scss';

const ScrollBottomButton = ({onClick}: Props) => {
    return (
        <div className={style.root}>
            <button
                onClick={onClick}
                className={style.button}
            >
                <img
                    className={style.icon}
                    src={arrowUp}
                    alt="arrow-up icon"
                />
            </button>
        </div>
    );
};

export default ScrollBottomButton;
