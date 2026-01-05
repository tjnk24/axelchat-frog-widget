import PropTypes from 'prop-types';
import {Component} from 'react';

import {TagView} from '../TagView';

import style from './style.module.scss';

export class AuthorView extends Component {
    static propTypes = {
        author: PropTypes.object.isRequired,
        showPlatformIcon: PropTypes.bool,
    };

    static defaultProps = {
        author: null,
        showPlatformIcon: true,
    };

    render() {
        const author = this.props?.['author'];

        if (!author) {
            return <span>NULL_AUTHOR</span>;
        }

        return (
            <span>
                {this.props?.['showPlatformIcon'] &&
                <span>
                    <img
                        className={style.badgeServiceIcon}
                        alt="service icon"
                        src={author.serviceBadge}
                    />
                </span>}

                {/* <img
                    className={style.avatar}
                    alt="avatar"
                    src={author.avatar}
                    height={32}
                    width={32}
                /> */}

                <span>
                    {author.leftTags.map((tag, idx) => (
                        <TagView key={idx} tag={tag}/>
                    ))}
                </span>

                <span>
                    {author.leftBadges.map((badgeUrl, idx) => (
                        <img
                            key={idx}
                            className={style.badgeLeft}
                            alt="badge"
                            src={badgeUrl}
                        />
                    ))}
                </span>

                <span
                    className={`${style.authorName} ${author.customBackgroundColor.length > 0 ? style.authorNameCustomBackgroundColor : ''}`}
                    style={{
                        'color': author.color,
                        'backgroundColor': author.customBackgroundColor,
                    }}>
                    {author.name}
                </span>

                <span>
                    {author.rightBadges.map((badgeUrl, idx) => (
                        <img
                            key={idx}
                            className={style.badgeRight}
                            alt="badge right"
                            src={badgeUrl}
                        />
                    ))}
                </span>

                <span>
                    {author.rightTags.map((tag, idx) => (
                        <TagView key={idx} tag={tag}/>
                    ))}
                </span>
            </span>
        );
    }
}
