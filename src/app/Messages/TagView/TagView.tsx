import PropTypes from 'prop-types';
import {Component} from 'react';

import style from './style.module.scss';

export class TagView extends Component {
    static propTypes = {
        tag: PropTypes.object.isRequired,

        text: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string,
        textColor: PropTypes.string,
    };

    static defaultProps = {
        tag: {
            text: 'tag',
            backgroundColor: '#03A9F4',
            textColor: 'black',
        },
    };

    render() {
        const tag = this.props?.['tag'];

        if (!tag) {
            return <span>null</span>;
        }

        return (
            <span
                className={style.tag}
                style={{
                    'backgroundColor': tag.backgroundColor,
                    'color': tag.textColor,
                }}
            >
                {tag.text}
            </span>
        );
    }
}
