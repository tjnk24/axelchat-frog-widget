import cn from 'classnames';
import PropTypes from 'prop-types';
import {Component} from 'react';

import apiOutlined from '__images/api-outlined.svg';
import checkCircleOutlined from '__images/check-circle.svg';
import loadingOutlined from '__images/loading.svg';

import style from './style.module.scss';

export const IndicatorType = {
    TextOnly: 'TextOnly',
    Success: 'Success',
    Loading: 'Loading',
    Critical: 'Critical',
};

export class AnimatedDummyTextView extends Component {
    static propTypes = {
        type: PropTypes.string,
        text: PropTypes.string.isRequired,
    };

    static defaultProps = {
        type: IndicatorType.Loading,
        text: 'TEXT',
    };

    render() {
        const type = this.props?.['type'];

        const makeIcon = () => {
            switch (type) {
                case IndicatorType.Loading:
                    return (
                        <img
                            className={cn(style.icon, style.iconLoading)}
                            src={loadingOutlined}
                            alt="loading"
                        />
                    );

                case IndicatorType.Success:
                    return (
                        <img
                            className={style.icon}
                            src={checkCircleOutlined}
                            alt="check"
                        />
                    );

                case IndicatorType.Critical:
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
        };

        return (
            <>
                {makeIcon()}

                <span
                    className={style.text}
                    style={{
                        marginLeft: '6px',
                    }}
                >{this.props?.['text']}</span>
            </>
        );
    }
}
