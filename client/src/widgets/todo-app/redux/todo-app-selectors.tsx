import { todoAppConstants } from './todo-app-constants';

const getStatus = (state: any): any => state[todoAppConstants.id].status;
const getErrors = (state: any): any => state[todoAppConstants.id].errors;
const getUserInfo = (state: any): any => state[todoAppConstants.id].userInfo;
const getTodos = (state: any): any => state[todoAppConstants.id].todos;

export const todoAppSelectors = {
    getStatus,
    getErrors,
    getUserInfo,
    getTodos,
};