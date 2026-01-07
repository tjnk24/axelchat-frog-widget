import isEmpty from 'lodash/isEmpty';
import {useSelector} from 'react-redux';

import {appStateSettingsWidgetsSelector} from '__selectors/appStateSelectors';
import {IndicatorTypeEnum} from '__utils/types';

import AnimatedDummyText from '../../components/animated-dummy-text';
import Message from '../message';
import ScrollBottomButton from '../scroll-bottom-button';

import {Props} from './types';

import style from './style.module.scss';

const MessagesList = ({messages = []}: Props) => {
    const {hideConnectionStatusWhenConnected} = useSelector(appStateSettingsWidgetsSelector);

    if (isEmpty(messages)) {
        if (hideConnectionStatusWhenConnected) {
            return null;
        }

        return (
            <AnimatedDummyText
                type={IndicatorTypeEnum.Success}
                text="Connected!"
            />
        );
    }

    return (
        <div>
            <div className={style.list}>
                {messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>

            {/* <ScrollBottomButton onClick={onScrollToBottomClick}/> */}
        </div>
    );
};

export default MessagesList;
