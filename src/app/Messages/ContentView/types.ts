import {CSSProperties} from 'react';

export enum ContentTypeEnum {
    Text = 'text',
    Image = 'image',
    Hyperlink = 'hyperlink',
    Html = 'html'
}

export type ContentDataDto = {
    text?: string;
    url?: string;
    html?: string;
}

export type ContentDto = {
    type: ContentTypeEnum;
    htmlClassName?: string;
    data: ContentDataDto;
    style?: CSSProperties;
}

interface OwnProps {
    content?: ContentDto;
}

export type Props = OwnProps;
