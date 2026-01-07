import isEmpty from 'lodash/isEmpty';
import {
    CSSProperties,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';

import {appStateSettingsWidgetsMessagesSelector} from '__selectors/appStateSelectors';
import {WidgetTypeEnum} from '__utils/types';

import Author from '../author';
import Content from '../content';

import {Props} from './types';

import style from './style.module.scss';

const Message = ({message}: Props) => {
    const messages = useSelector(appStateSettingsWidgetsMessagesSelector);

    const [isNeedToHide, setIsNeedToHide] = useState(false);

    const [searchParams] = useSearchParams();

    const widgetType = searchParams.get('widget');

    const hideTimeout = widgetType === WidgetTypeEnum.Messages ? messages.hideTimeout : 0;

    const {
        bodyStyle,
        publishedAt,
        author,
        multiline,
    } = message || {};

    useEffect(() => {
        const isNeedToHideTimeout = hideTimeout > 0 &&
            setTimeout(() => {
                setIsNeedToHide(true);
            }, hideTimeout);

        return () => {
            isNeedToHideTimeout && clearTimeout(isNeedToHideTimeout);
        };
    }, [hideTimeout]);

    const getMessageStyle = useMemo(() => {
        const result: CSSProperties = {
            ...messages.style,
            'backgroundColor': messages.style?.['background-color'],
        };

        delete result['background-color'];

        if (bodyStyle?.backgroundColor) {
            result['backgroundColor'] = bodyStyle.backgroundColor;
        }

        if (bodyStyle?.borderColor) {
            result['borderWidth'] = '2px';
            result['borderStyle'] = 'solid';
            result['borderColor'] = bodyStyle.borderColor;
        }

        return result;
    }, [bodyStyle, messages.style]);

    if (isEmpty(message)) {
        return <span>NULL_MESSAGE</span>;
    }

    return (
        <div className={style.messageViewContainer}>
            <span
                className={`${style.message} ${isNeedToHide ? style.hiddenFadeOut : ''}`}
                style={getMessageStyle}
            >
                <span className={style.time}>
                    {new Date(publishedAt).toLocaleTimeString()}
                </span>

                <br/>

                <Author author={author}/>

                {multiline ? <br/> : <span className={style.authorMessageContentSeparator}></span>}

                <div>
                    {message.contents.map((content, idx) => (
                        <Content
                            key={idx}
                            content={content}
                        />
                    ))}
                </div>
            </span>
        </div>
    );
};

export default Message;
