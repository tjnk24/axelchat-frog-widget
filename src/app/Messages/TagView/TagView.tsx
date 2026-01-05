import {DEFAULT_TAG} from './consts';
import {Props} from './types';

import style from './style.module.scss';

const TagView = ({tag = DEFAULT_TAG}: Props) => {
    const {
        text,
        textColor,
        backgroundColor,
    } = tag;

    return (
        <span
            className={style.tag}
            style={{backgroundColor, color: textColor}}
        >
            {text}
        </span>
    );
};

export default TagView;
