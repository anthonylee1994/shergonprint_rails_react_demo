import { todoApiConstants } from './todo-api-constants';

const getAuthToken = (state: any): any => state[todoApiConstants.id].auth_token;

export const todoApiSelector = {
    getAuthToken,
};