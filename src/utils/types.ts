export enum IndicatorTypeEnum {
    TextOnly = 'TextOnly',
    Success = 'Success',
    Loading = 'Loading',
    Critical = 'Critical',
};

export type TagDto = {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
};

export type MessageDto = {
    id: string;
};
