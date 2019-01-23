// import { addLocaleData } from 'react-intl';
import { intlReducer } from 'react-intl-redux';
// import * as zhLocaleData from 'react-intl/locale-data/zh';

// addLocaleData([...zhLocaleData]);

export function getIntlModule() {
    return {
        id: "intl",
        initialState: {
            defaultLocale: 'en',
            locale: 'en',
        },
        reducerMap: {
            intl: intlReducer
        }
    };
}