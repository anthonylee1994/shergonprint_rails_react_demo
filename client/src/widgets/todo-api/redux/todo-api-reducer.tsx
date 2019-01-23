import { todoApiActions } from './todo-api-actions';

export const todoApiReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case todoApiActions.types.SET_AUTH_TOKEN:
            return {
                ...state,
                auth_token: action.payload || null
            };
        default:
            return state;
    }
};