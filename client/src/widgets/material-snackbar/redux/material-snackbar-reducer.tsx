import { get } from 'lodash';
import { materialSnackbarActions } from './material-snackbar-actions';

export const materialSnackbarReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case materialSnackbarActions.types.OPEN:
            return {
                ...state,
                [get(action, 'payload.id')]: {
                    ...get(state, get(action, 'payload.id'), {}),
                    variant: get(action, 'payload.variant', null),
                    message: get(action, 'payload.message', null),
                    visible: true
                }
            };
        case materialSnackbarActions.types.CLOSE:
            return {
                ...state,
                [get(action, 'payload.id')]: {
                    ...get(state, get(action, 'payload.id'), {}),
                    message: null,
                    visible: false
                }
            };
        default:
            return state;
    }
};