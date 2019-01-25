import { get } from 'lodash';
import { put, takeLatest } from 'redux-saga/effects';
import { materialSnackbarActions } from '../../material-snackbar/redux/material-snackbar-actions';
import { todoApi } from '../../todo-api';
import { todoAppActions } from './todo-app-actions';
import { todoAppConstants } from './todo-app-constants';
import { todoAppLang } from './todo-app-lang';

function* loadUserInfoRequest(action: any) {
    try {
        const result = yield todoApi.account.info();
        const json = yield result.json();
        yield put(todoAppActions.creators.loadUserInfo.success(json));
    } catch (e) {
        console.error(e);
        yield put(todoAppActions.creators.loadUserInfo.failure(action, e));
    }
}

function* loadTodosRequest(action: any) {
    try {
        const result = yield todoApi.todo.list();
        const json = yield result.json();
        yield put(todoAppActions.creators.loadTodos.success(json));
    } catch (e) {
        console.error(e);
        yield put(todoAppActions.creators.loadTodos.failure(action, e));
    }
}

function* removeTodoRequest(action: any) {
    try {
        const id = get(action, 'payload.id');
        const name = get(action, 'payload.title');
        const item = get(action, 'payload');
        yield todoApi.todo.delete(id);
        yield put(todoAppActions.creators.removeTodo.success(item));
        yield put(materialSnackbarActions.creators.open(todoAppConstants.id)(
            todoAppLang["app.todo.app.todos.remove.success"].replace('{name}', name),
            'success'
        ));
    } catch (e) {
        console.error(e);
        yield put(todoAppActions.creators.removeTodo.failure(action, e));
        yield put(materialSnackbarActions.creators.open(todoAppConstants.id)(
            todoAppLang["app.todo.app.todos.remove.error"].replace('{name}', name),
            'error'
        ));
    }
}

function* removeTodoItemRequest(action: any) {
    try {
        const todoId = get(action, 'payload.todoId')
        const id = get(action, 'payload.data.id');
        const name = get(action, 'payload.data.name');
        const item = get(action, 'payload.data');
        yield todoApi.todo.items.delete(todoId, id);
        yield put(todoAppActions.creators.removeTodoItem.success(todoId, item));
        yield put(materialSnackbarActions.creators.open(todoAppConstants.id)(
            todoAppLang["app.todo.app.todos.remove.success"].replace('{name}', name),
            'success'
        ));
    } catch (e) {
        console.error(e);
        yield put(todoAppActions.creators.removeTodoItem.failure(action, e));
        yield put(materialSnackbarActions.creators.open(todoAppConstants.id)(
            todoAppLang["app.todo.app.todos.remove.error"].replace('{name}', name),
            'error'
        ));
    }
}

export function* todoAppSaga() {
    yield takeLatest(todoAppActions.types.LOAD_USER_INFO.REQUEST, loadUserInfoRequest);
    yield takeLatest(todoAppActions.types.LOAD_TODOS.REQUEST, loadTodosRequest);
    yield takeLatest(todoAppActions.types.REMOVE_TODO.REQUEST, removeTodoRequest);
    yield takeLatest(todoAppActions.types.REMOVE_TODO_ITEM.REQUEST, removeTodoItemRequest);
};

