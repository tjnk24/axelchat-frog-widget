import isEmpty from 'lodash/isEmpty';

export const getNavigatorLanguage = () => {
    if (!isEmpty(navigator?.languages)) {
        return navigator.languages[0];
    } else {
        return navigator?.['userLanguage'] || navigator.language || navigator?.['browserLanguage'] || 'en';
    }
};
