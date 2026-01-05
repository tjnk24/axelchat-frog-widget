import {CSSProperties} from 'react';

export enum IndicatorTypeEnum {
    TextOnly = 'TextOnly',
    Success = 'Success',
    Loading = 'Loading',
    Critical = 'Critical',
};

export type MessageAuthorTagDto = {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
};

export type MessageAuthorDto = {
    serviceBadge: string;
    leftTags?: MessageAuthorTagDto[];
    rightTags?: MessageAuthorTagDto[];
    leftBadges?: string[];
    rightBadges?: string[];
    customBackgroundColor?: string;
    color?: string;
    name?: string;
}

export type MessageForcedColorsDto = {
    bodyBackground?: string;
    bodyBorder?: string;
};

export enum MessageContentTypeEnum {
    Text = 'text',
    Image = 'image',
    Hyperlink = 'hyperlink',
    Html = 'html'
}

export type MessageContentDataDto = {
    text?: string;
    url?: string;
    html?: string;
}

export type MessageContentDto = {
    type: MessageContentTypeEnum;
    htmlClassName?: string;
    data: MessageContentDataDto;
    style?: CSSProperties;
}

export type MessageDto = {
    id: string;
    forcedColors?: MessageForcedColorsDto;
    publishedAt?: string;
    author: MessageAuthorDto;
    multiline?: boolean;
    contents?: MessageContentDto[];
};

export type ServiceDto = {
    enabled: boolean;
    viewers: number;
    icon?: string;
};
