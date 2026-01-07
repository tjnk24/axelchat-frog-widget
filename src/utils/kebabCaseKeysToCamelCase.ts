import {CSSProperties} from 'react';

export const kebabCaseKeysToCamelCase = (styleObject: Record<string, string>) => {
    const result: CSSProperties = {};

    Object.entries(styleObject).forEach(([key, value]) => {
        const camelCaseKey = key.replace(/-./g, x=>x[1].toUpperCase());

        result[camelCaseKey] = value;
    });

    return result;
};
