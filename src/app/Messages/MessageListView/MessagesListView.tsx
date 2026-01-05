import PropTypes from 'prop-types';
import {Component} from 'react';

import {IndicatorTypeEnum} from '__utils/types';

import AnimatedDummyTextView from '../../AnimatedDummyTextView';
import {MessageView} from '../MessageView';
import ScrollBottomButton from '../ScrollBottomButton';

import style from './style.module.scss';

export class MessagesListView extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        hideTimeout: PropTypes.number,
        hideConnectionStatusWhenConnected: PropTypes.bool,
        messageStyle: PropTypes.object,
        showPlatformIcon: PropTypes.bool,
        isScrolledToBottom: PropTypes.bool,
    };

    static defaultProps = {
        messages: [],
        hideTimeout: 0,
        hideConnectionStatusWhenConnected: false,
        messageStyle: {},
        showPlatformIcon: true,
        isScrolledToBottom: false,
    };

    private messagesEnd: HTMLDivElement = null;

    scrollToBottom = () => {
        if (
            this.messagesEnd !== undefined
            && this.messagesEnd !== null
            && this.props?.['isScrolledToBottom']
        ) {
            this.messagesEnd.scrollIntoView({behavior: 'smooth'});
        }
    };

    onScrollToBottomClick = () => {
        this.messagesEnd.scrollIntoView({behavior: 'smooth'});
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        if (this.props?.['messages'].length === 0) {
            if (this.props?.['hideConnectionStatusWhenConnected']) {
                return null;
            }
            else {
                return (
                    <AnimatedDummyTextView
                        type={IndicatorTypeEnum.Success}
                        text="Connected!"
                    />
                );
            }
        } else {
            return (
                <div>
                    <div className={style.list}>
                        {this.props?.['messages'].map(message => (
                            <div
                                style={{display: 'flex', justifyContent: 'space-between'}}
                                key={message.id}
                            >
                                <MessageView
                                    message={message}
                                    messageStyle={this.props?.['messageStyle']}
                                    hideTimeout={this.props?.['hideTimeout']}
                                    showPlatformIcon={this.props?.['showPlatformIcon']}
                                />
                            </div>
                        ))}
                    </div>

                    <div
                        style={{float: 'left', clear: 'both'}}
                        ref={el => {
                            this.messagesEnd = el;
                        }}
                    ></div>

                    {
                        this.messagesEnd !== undefined
                        && this.messagesEnd !== null
                        && !this.props?.['isScrolledToBottom'] &&
                        <ScrollBottomButton onClick={this.onScrollToBottomClick}/>
                    }
                </div>
            );
        }
    }
}
