import PropTypes from 'prop-types';
import {Component} from 'react';

import style from './style.module.scss';

export class TimeView extends Component {
    static propTypes = {
        timeIso: PropTypes.string.isRequired,
    };

    static defaultProps = {
        timeIso: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            timeText: '',
        };

        const date = new Date(props.timeIso);

        this.state['timeText'] = date.toLocaleTimeString();
    }

    render() {
        const timeText = this.state['timeText'];

        return (
            <span>
                <span className={style.time}>{timeText}</span>
            </span>
        );
    }
}
