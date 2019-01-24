import * as ls from 'local-storage';
// import { todoApiConstants } from './todo-api-constants';

const getAuthToken = (state: any): any => ls.get('auth_token');

export const todoApiSelectors = {
    getAuthToken,
};