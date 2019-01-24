import { get } from 'lodash';
import { put, takeLatest } from 'redux-saga/effects';
import { todoApi } from '../../todo-api';
import { todoAppActions } from './todo-app-actions';

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
        yield todoApi.todo.delete(action.payload);
        yield put(todoAppActions.creators.removeTodo.success(action.payload));
    } catch (e) {
        console.error(e);
        yield put(todoAppActions.creators.removeTodo.failure(action, e));
    }
}

function* removeTodoItemRequest(action: any) {
    try {
        const todoId = get(action, 'payload.todoId')
        const id = get(action, 'payload.id');
        yield todoApi.todo.items.delete(todoId, id);
        yield put(todoAppActions.creators.removeTodoItem.success(todoId, id));
    } catch (e) {
        console.error(e);
        yield put(todoAppActions.creators.removeTodoItem.failure(action, e));
    }
}

export function* todoAppSaga() {
    yield takeLatest(todoAppActions.types.LOAD_USER_INFO.REQUEST, loadUserInfoRequest);
    yield takeLatest(todoAppActions.types.LOAD_TODOS.REQUEST, loadTodosRequest);
    yield takeLatest(todoAppActions.types.REMOVE_TODO.REQUEST, removeTodoRequest);
    yield takeLatest(todoAppActions.types.REMOVE_TODO_ITEM.REQUEST, removeTodoItemRequest);
};

