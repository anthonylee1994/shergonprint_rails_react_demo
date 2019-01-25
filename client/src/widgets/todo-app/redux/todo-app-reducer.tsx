import { get } from 'lodash';
import { todoAppActions } from './todo-app-actions';
import { todoAppConstants } from './todo-app-constants';

export const todoAppReducer = (state: any = {}, action: any) => {
    const actionType = action.type.replace(new RegExp(`_REQUEST|_SUCCESS|_FAILURE|(\@\@${todoAppConstants.id}\/)`, 'g'), '');
    switch (action.type) {
        case todoAppActions.types.LOAD_USER_INFO.REQUEST:
        case todoAppActions.types.LOAD_TODOS.REQUEST:
        case todoAppActions.types.CREATE_TODO.REQUEST:
        case todoAppActions.types.UPDATE_TODO.REQUEST:
        case todoAppActions.types.REMOVE_TODO.REQUEST:
        case todoAppActions.types.CREATE_TODO_ITEM.REQUEST:
        case todoAppActions.types.UPDATE_TODO_ITEM.REQUEST:
        case todoAppActions.types.REMOVE_TODO_ITEM.REQUEST:
            return {
                ...state,
                status: {
                    ...get(state, 'status', {}),
                    [actionType]: 'request'
                }
            };
        case todoAppActions.types.LOAD_USER_INFO.SUCCESS:
            return {
                ...state,
                status: {
                    ...get(state, 'status', {}),
                    [actionType]: 'success'
                },
                userInfo: get(action, 'payload')
            };
        case todoAppActions.types.LOAD_TODOS.SUCCESS:
            return {
                ...state,
                status: {
                    ...get(state, 'status', {}),
                    [actionType]: 'success'
                },
                todos: get(action, 'payload')
            };
        case todoAppActions.types.CREATE_TODO.SUCCESS:
            return {
                ...state,
                status: {
                    ...get(state, 'status', {}),
                    [actionType]: 'success'
                },
                todos: [
                    get(action, 'payload'),
                    ...get(state, 'todos', []),
                ]
            };
        case todoAppActions.types.UPDATE_TODO.SUCCESS:
        case todoAppActions.types.CREATE_TODO_ITEM.SUCCESS:
        case todoAppActions.types.UPDATE_TODO_ITEM.SUCCESS:
            return {
                ...state,
                status: {
                    ...get(state, 'status', {}),
                    [actionType]: 'success'
                },
                todos: get(state, 'todos', []).map((item: any) => get(item, 'id') === get(action, 'payload.id') ? get(action, 'payload') : item),
            };
        case todoAppActions.types.REMOVE_TODO.SUCCESS:
            return {
                ...state,
                status: {
                    ...get(state, 'status', {}),
                    [actionType]: 'success'
                },
                todos: get(state, 'todos', []).filter((item: any) => get(item, 'id') !== get(action, 'payload.id')),
            };
        case todoAppActions.types.REMOVE_TODO_ITEM.SUCCESS:
            return {
                ...state,
                status: {
                    ...get(state, 'status', {}),
                    [actionType]: 'success'
                },
                todos: get(state, 'todos', []).map((item: any) => get(item, 'id') === get(action, 'payload.todoId') ? {
                    ...item,
                    items: get(item, 'items').filter((subItem: any) => get(subItem, 'id') !== get(action, 'payload.data.id'))
                }   : item),
            };
        case todoAppActions.types.LOAD_USER_INFO.FAILURE:
        case todoAppActions.types.LOAD_TODOS.FAILURE:
            return {
                ...state,
                status: {
                    ...get(state, 'status', {}),
                    [actionType]: 'failure'
                },
                errors: {
                    ...get(state, 'errors', {}),
                    [actionType]: action.payload
                }
            };
        default:
            return state;
    }
};