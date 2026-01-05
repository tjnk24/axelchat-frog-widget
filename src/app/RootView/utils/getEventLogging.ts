import isString from 'lodash/isString';

export const getEventLogging = (searchParams: URLSearchParams) => {
    const param = searchParams.get('event-logging');

    if (isString(param)) {
        return param.toLowerCase() === 'true' ? true : false;
    }

    return false;
};
