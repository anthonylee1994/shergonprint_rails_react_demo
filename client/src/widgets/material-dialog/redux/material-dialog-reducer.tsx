import { get } from 'lodash';
import { materialDialogActions } from './material-dialog-actions';

export const materialDialogReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case materialDialogActions.types.OPEN:
            return {
                ...state,
                [get(action, 'payload.id')]: {
                    ...get(state, get(action, 'payload.id'), {}),
                    data: get(action, 'payload.data'),
                    visible: true
                }
            };
        case materialDialogActions.types.CLOSE:
            return {
                ...state,
                [get(action, 'payload.id')]: {
                    ...get(state, get(action, 'payload.id'), {}),
                    data: null,
                    visible: false
                }
            };
        default:
            return state;
    }
};