import isEmpty from 'lodash/isEmpty';
import {useSelector} from 'react-redux';

import {appStateSettingsWidgetsMessagesSelector} from '__selectors/appStateSelectors';

import Tag from '../../components/tag';

import {Props} from './types';

import style from './style.module.scss';

const Author = ({author}: Props) => {
    const {showPlatformIcon} = useSelector(appStateSettingsWidgetsMessagesSelector);

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
        <div className={style.author}>
            {showPlatformIcon && (
                <img
                    className={style.badgeServiceIcon}
                    alt="service icon"
                    src={serviceBadge}
                />
            )}

            <div>
                {leftTags.map((tag, index) => (
                    <Tag
                        key={index}
                        tag={tag}
                    />
                ))}
            </div>

            <div>
                {leftBadges.map((badgeUrl, index) => (
                    <img
                        key={index}
                        className={style.badgeLeft}
                        alt="badge"
                        src={badgeUrl}
                    />
                ))}
            </div>

            <span
                className={`${style.authorName} ${customBackgroundColor.length > 0 ? style.authorNameCustomBackgroundColor : ''}`}
                style={{color, backgroundColor: customBackgroundColor}}
            >
                {name}
            </span>

            <div>
                {rightBadges.map((badgeUrl, idx) => (
                    <img
                        key={idx}
                        className={style.badgeRight}
                        alt="badge right"
                        src={badgeUrl}
                    />
                ))}
            </div>

            <div>
                {rightTags.map((tag, idx) => (
                    <Tag key={idx} tag={tag}/>
                ))}
            </div>
        </div>
    );
};

export default Author;
