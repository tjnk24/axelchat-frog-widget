import PropTypes from 'prop-types';
import {Component} from 'react';

import {AuthorView} from '../AuthorView';
import {ContentView} from '../ContentView';
import {TimeView} from '../TimeView';

import style from './style.module.scss';

export class MessageView extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired,
        hideTimeout: PropTypes.number,
        messageStyle: PropTypes.object,
        showPlatformIcon: PropTypes.bool,
    };

    static defaultProps = {
        message: null,
        hideTimeout: 0,
        messageStyle: {},
        showPlatformIcon: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            needToHide: false,
        };

        if (props.hideTimeout > 0)
        {
            setTimeout(() =>
            {
                this.setState({
                    needToHide: true,
                });
            }, props.hideTimeout);
        }
    }

    getMessageStyle() {
        const message = this.props?.['message'];
        const forcedColors = message.forcedColors;

        const r = {
            ...this.props?.['messageStyle'],
            'visibility': this.state?.['visibility'],
            'backGroundColor': this.props?.['messageStyle']?.['background-color'],
        };

        delete r['background-color'];

        if (forcedColors.bodyBackground !== undefined) {
            r['backgroundColor'] = forcedColors.bodyBackground;
        }

        if (forcedColors.bodyBorder !== undefined) {
            r['borderWidth'] = '2px';
            r['borderStyle'] = 'solid';
            r['borderColor'] = forcedColors.bodyBorder;
        }

        return r;
    }

    render() {
        const message = this.props?.['message'];
        if (!message) {
            return <span>NULL_MESSAGE</span>;
        }

        //console.log(message)
        const multiline = this.props?.['message'].multiline;

        return (
            <span
                className={`${style.message} ${this.state?.['needToHide'] ? style.hiddenFadeOut : ''}`}
                style={this.getMessageStyle()}
            >

                <TimeView timeIso={message.publishedAt}/>

                <br/>

                <AuthorView author={message.author} showPlatformIcon={this.props?.['showPlatformIcon']}/>

                {multiline ?
                    (
                        <br/>
                    ) :
                    (
                        <span className={style.authorMessageContentSeparator}></span>
                    )
                }

                <span>
                    {message.contents.map((content, idx) => (
                        <ContentView key={idx} content={content}/>
                    ))}
                </span>
            </span>
        );
    }
}
