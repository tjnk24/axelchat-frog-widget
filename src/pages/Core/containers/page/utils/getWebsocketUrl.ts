import isString from 'lodash/isString';

export const getWebSocketUrl = (searchParams: URLSearchParams) => {
    const param = searchParams.get('ws-url');

    if (isString(param)) {
        return param;
    }

    return `ws://${window.location.hostname}:${window.location.port}/`;
};
