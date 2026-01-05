import isEmpty from 'lodash/isEmpty';

import TagView from '../TagView';

import {Props} from './types';

import style from './style.module.scss';

const AuthorView = ({author, showPlatformIcon = true}: Props) => {
    if (isEmpty(author)) {
        return <span>NULL_AUTHOR</span>;
    }

    const {
        serviceBadge,
        color,
        customBackgroundColor,
        leftBadges = [],
        leftTags = [],
        name,
        rightBadges = [],
        rightTags = [],
    } = author || {};

    return (
        <span>
            {showPlatformIcon && (
                <span>
                    <img
                        className={style.badgeServiceIcon}
                        alt="service icon"
                        src={serviceBadge}
                    />
                </span>
            )}

            <span>
                {leftTags.map((tag, index) => (
                    <TagView
                        key={index}
                        tag={tag}
                    />
                ))}
            </span>

            <span>
                {leftBadges.map((badgeUrl, index) => (
                    <img
                        key={index}
                        className={style.badgeLeft}
                        alt="badge"
                        src={badgeUrl}
                    />
                ))}
            </span>

            <span
                className={`${style.authorName} ${customBackgroundColor.length > 0 ? style.authorNameCustomBackgroundColor : ''}`}
                style={{color, backgroundColor: customBackgroundColor}}
            >
                {name}
            </span>

            <span>
                {rightBadges.map((badgeUrl, idx) => (
                    <img
                        key={idx}
                        className={style.badgeRight}
                        alt="badge right"
                        src={badgeUrl}
                    />
                ))}
            </span>

            <span>
                {rightTags.map((tag, idx) => (
                    <TagView key={idx} tag={tag}/>
                ))}
            </span>
        </span>
    );
};

export default AuthorView;
