import isEmpty from 'lodash/isEmpty';
import {
    CSSProperties,
    useEffect,
    useMemo,
    useState,
} from 'react';

import AuthorView from '../AuthorView';
import ContentView from '../ContentView';
import TimeView from '../TimeView';

import {Props} from './types';

import style from './style.module.scss';

const MessageView = ({
    hideTimeout = 0,
    message,
    messageStyle,
    showPlatformIcon = true,
}: Props) => {
    const [isNeedToHide, setIsNeedToHide] = useState(false);

    const {
        forcedColors,
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
            ...messageStyle,
            'backgroundColor': messageStyle?.['background-color'],
        };

        delete result['background-color'];

        if (forcedColors?.bodyBackground !== undefined) {
            result['backgroundColor'] = forcedColors.bodyBackground;
        }

        if (forcedColors?.bodyBorder !== undefined) {
            result['borderWidth'] = '2px';
            result['borderStyle'] = 'solid';
            result['borderColor'] = forcedColors.bodyBorder;
        }

        return result;
    }, [forcedColors, messageStyle]);

    if (isEmpty(message)) {
        return <span>NULL_MESSAGE</span>;
    }

    return (
        <span
            className={`${style.message} ${isNeedToHide ? style.hiddenFadeOut : ''}`}
            style={getMessageStyle}
        >

            <TimeView timeIso={publishedAt}/>

            <br/>

            <AuthorView
                author={author}
                showPlatformIcon={showPlatformIcon}
            />

            {multiline ? <br/> : <span className={style.authorMessageContentSeparator}></span>}

            <span>
                {message.contents.map((content, idx) => (
                    <ContentView
                        key={idx}
                        content={content}
                    />
                ))}
            </span>
        </span>
    );
};

export default MessageView;
