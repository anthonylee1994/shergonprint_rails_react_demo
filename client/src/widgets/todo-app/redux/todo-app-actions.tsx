import { todoAppConstants } from './todo-app-constants';

const types = {
    LOAD_USER_INFO: {
        REQUEST: `@@${todoAppConstants.id}/LOAD_USER_INFO_REQUEST`,
        SUCCESS: `@@${todoAppConstants.id}/LOAD_USER_INFO_SUCCESS`,
        FAILURE: `@@${todoAppConstants.id}/LOAD_USER_INFO_FAILURE`,
    },
    LOAD_TODOS: {
        REQUEST: `@@${todoAppConstants.id}/LOAD_TODOS_REQUEST`,
        SUCCESS: `@@${todoAppConstants.id}/LOAD_TODOS_SUCCESS`,
        FAILURE: `@@${todoAppConstants.id}/LOAD_TODOS_FAILURE`,
    },
    CREATE_TODO: {
        REQUEST: `@@${todoAppConstants.id}/CREATE_TODO_REQUEST`,
        SUCCESS: `@@${todoAppConstants.id}/CREATE_TODO_SUCCESS`,
        FAILURE: `@@${todoAppConstants.id}/CREATE_TODO_FAILURE`,
    },
    UPDATE_TODO: {
        REQUEST: `@@${todoAppConstants.id}/UPDATE_TODO_REQUEST`,
        SUCCESS: `@@${todoAppConstants.id}/UPDATE_TODO_SUCCESS`,
        FAILURE: `@@${todoAppConstants.id}/UPDATE_TODO_FAILURE`,
    },
    REMOVE_TODO: {
        REQUEST: `@@${todoAppConstants.id}/REMOVE_TODO_REQUEST`,
        SUCCESS: `@@${todoAppConstants.id}/REMOVE_TODO_SUCCESS`,
        FAILURE: `@@${todoAppConstants.id}/REMOVE_TODO_FAILURE`,
    },
    CREATE_TODO_ITEM: {
        REQUEST: `@@${todoAppConstants.id}/CREATE_TODO_ITEM_REQUEST`,
        SUCCESS: `@@${todoAppConstants.id}/CREATE_TODO_ITEM_SUCCESS`,
        FAILURE: `@@${todoAppConstants.id}/CREATE_TODO_ITEM_FAILURE`,
    },
    UPDATE_TODO_ITEM: {
        REQUEST: `@@${todoAppConstants.id}/UPDATE_TODO_ITEM_REQUEST`,
        SUCCESS: `@@${todoAppConstants.id}/UPDATE_TODO_ITEM_SUCCESS`,
        FAILURE: `@@${todoAppConstants.id}/UPDATE_TODO_ITEM_FAILURE`,
    },
    REMOVE_TODO_ITEM: {
        REQUEST: `@@${todoAppConstants.id}/REMOVE_TODO_ITEM_REQUEST`,
        SUCCESS: `@@${todoAppConstants.id}/REMOVE_TODO_ITEM_SUCCESS`,
        FAILURE: `@@${todoAppConstants.id}/REMOVE_TODO_ITEM_FAILURE`,
    },
};

const creators = {
    loadUserInfo: {
        request: () => ({
            type: types.LOAD_USER_INFO.REQUEST
        }),
        success: (data: any) => ({
            payload: data,
            type: types.LOAD_USER_INFO.SUCCESS
        }),
        failure: (requestAction: any, error: any) => ({
            payload: {
                requestAction,
                error,
            },
            type: types.LOAD_USER_INFO.FAILURE,
        }),
    },
    loadTodos: {
        request: () => ({
            type: types.LOAD_TODOS.REQUEST
        }),
        success: (data: any) => ({
            payload: data,
            type: types.LOAD_TODOS.SUCCESS
        }),
        failure: (requestAction: any, error: any) => ({
            payload: {
                requestAction,
                error,
            },
            type: types.LOAD_TODOS.FAILURE,
        }),
    },
    createTodo: {
        request: (data: any) => ({
            payload: data,
            type: types.CREATE_TODO.REQUEST
        }),
        success: (data: any) => ({
            payload: data,
            type: types.CREATE_TODO.SUCCESS
        }),
        failure: (requestAction: any, error: any) => ({
            payload: {
                requestAction,
                error,
            },
            type: types.CREATE_TODO.FAILURE,
        }),
    },
    createTodoItem: {
        request: (todoId: number, data: any) => ({
            payload: {
                todoId,
                data
            },
            type: types.CREATE_TODO_ITEM.REQUEST
        }),
        success: (data: any) => ({
            payload: data,
            type: types.CREATE_TODO_ITEM.SUCCESS
        }),
        failure: (requestAction: any, error: any) => ({
            payload: {
                requestAction,
                error,
            },
            type: types.CREATE_TODO_ITEM.FAILURE,
        }),
    },
    updateTodo: {
        request: (data: any) => ({
            payload: data,
            type: types.UPDATE_TODO.REQUEST
        }),
        success: (data: any) => ({
            payload: data,
            type: types.UPDATE_TODO.SUCCESS
        }),
        failure: (requestAction: any, error: any) => ({
            payload: {
                requestAction,
                error,
            },
            type: types.UPDATE_TODO.FAILURE,
        }),
    },
    updateTodoItem: {
        request: (todoId: number, data: any) => ({
            payload: {
                todoId,
                data
            },
            type: types.UPDATE_TODO_ITEM.REQUEST
        }),
        success: (data: any) => ({
            payload: data,
            type: types.UPDATE_TODO_ITEM.SUCCESS
        }),
        failure: (requestAction: any, error: any) => ({
            payload: {
                requestAction,
                error,
            },
            type: types.UPDATE_TODO_ITEM.FAILURE,
        }),
    },
    removeTodo: {
        request: (data: any) => ({
            payload: data,
            type: types.REMOVE_TODO.REQUEST
        }),
        success: (data: any) => ({
            payload: data,
            type: types.REMOVE_TODO.SUCCESS
        }),
        failure: (requestAction: any, error: any) => ({
            payload: {
                requestAction,
                error,
            },
            type: types.REMOVE_TODO.FAILURE,
        }),
    },
    removeTodoItem: {
        request: (todoId: number, data: any) => ({
            payload: {
                todoId,
                data
            },
            type: types.REMOVE_TODO_ITEM.REQUEST
        }),
        success: (todoId: number, data: any) => ({
            payload: {
                todoId,
                data
            },
            type: types.REMOVE_TODO_ITEM.SUCCESS
        }),
        failure: (requestAction: any, error: any) => ({
            payload: {
                requestAction,
                error,
            },
            type: types.REMOVE_TODO_ITEM.FAILURE,
        }),
    },
};

export const todoAppActions = {
    creators,
    types,
};