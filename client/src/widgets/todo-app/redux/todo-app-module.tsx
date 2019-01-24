import { todoAppConstants } from './todo-app-constants';
import { todoAppLang } from './todo-app-lang';
import { todoAppReducer } from './todo-app-reducer';
import { todoAppSaga } from './todo-app-saga';

export function getTodoAppModule() {
    return {
        id: todoAppConstants.id,
        lang: todoAppLang,
        reducerMap: {
            [todoAppConstants.id]: todoAppReducer,
        },
        sagas: [todoAppSaga]
    };
}