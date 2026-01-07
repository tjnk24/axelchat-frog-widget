import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import {useMemo} from 'react';

import {kebabCaseKeysToCamelCase} from '__utils/kebabCaseKeysToCamelCase';
import {MessageContentTypeEnum} from '__utils/types';

import {Props} from './types';

import style from './style.module.scss';

const {
    Html,
    Hyperlink,
    Image,
    Text,
} = MessageContentTypeEnum;

const Content = ({content}: Props) => {
    const {
        data,
        type,
        htmlClassName,
        style: contentStyle,
    } = content;

    const contentView = useMemo(() => {
        const formattedContentStyle = kebabCaseKeysToCamelCase(contentStyle);

        switch (type) {
            case Text:
                return (
                    <span
                        className={style.text}
                        style={{
                            ...formattedContentStyle,
                            'whiteSpace': 'pre-line',
                        }}
                    >
                        {data?.text}
                    </span>
                );

            case Image:
                return (
                    <img
                        className={cn(htmlClassName, style.image)}
                        style={style}
                        alt="content"
                        src={data?.url}
                    />
                );

            case Hyperlink:
                return (
                    <a
                        className={cn(style.hyperlink, htmlClassName)}
                        style={{...formattedContentStyle, 'whiteSpace': 'pre-line'}}
                        href={data.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {data.text}
                    </a>
                );

            case Html:
                return (
                    <div
                        className={htmlClassName}
                        style={formattedContentStyle}
                        dangerouslySetInnerHTML={{__html: data.html}}
                    />
                );

            default:
                return (
                    <div>
                        Unknown content type &apos;{type}&apos;
                    </div>
                );
        }
    }, [contentStyle, data, htmlClassName, type]);

    if (isEmpty(content)) {
        return <span>null</span>;
    }

    return contentView;
};

export default Content;
