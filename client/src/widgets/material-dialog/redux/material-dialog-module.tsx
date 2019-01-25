import { materialDialogConstants } from './material-dialog-constants';
import { materialDialogLang } from './material-dialog-lang';
import { materialDialogReducer } from './material-dialog-reducer';

export function getMaterialDialogModule() {
    return {
        id: materialDialogConstants.id,
        lang: materialDialogLang,
        reducerMap: {
            [materialDialogConstants.id]: materialDialogReducer,
        },
    };
}