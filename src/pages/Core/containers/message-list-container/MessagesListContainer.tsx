import isEmpty from 'lodash/isEmpty';
import {useSelector} from 'react-redux';

import {appStateSettingsWidgetsSelector} from '__selectors/appStateSelectors';
import {IndicatorTypeEnum} from '__utils/types';

import AnimatedDummyText from '../../components/animated-dummy-text';
import MessageList from '../message-list';

import {Props} from './types';

const MessageListContainer = ({messages = []}: Props) => {
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

    return <MessageList messages={messages}/>;
};

export default MessageListContainer;
