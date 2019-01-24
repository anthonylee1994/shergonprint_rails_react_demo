import * as ls from 'local-storage';
import { todoApiActions } from './todo-api-actions';

export const todoApiReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case todoApiActions.types.SET_AUTH_TOKEN:
            const token = action.payload || null;
            ls.set('auth_token', token);
            return state;
            case todoApiActions.types.CLEAR_AUTH_TOKEN:
            ls.remove('auth_token');
            return state;
        default:
            return state;
    }
};