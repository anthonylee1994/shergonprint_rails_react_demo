import { materialSnackbarConstants } from './material-snackbar-constants';
import { materialSnackbarLang } from './material-snackbar-lang';
import { materialSnackbarReducer } from './material-snackbar-reducer';

export function getMaterialSnackbarModule() {
    return {
        id: materialSnackbarConstants.id,
        lang: materialSnackbarLang,
        reducerMap: {
            [materialSnackbarConstants.id]: materialSnackbarReducer,
        },
    };
}