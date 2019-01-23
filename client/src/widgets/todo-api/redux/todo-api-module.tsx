import { todoApiConstants } from './todo-api-constants';
import { todoApiReducer } from './todo-api-reducer';

export function getTodoApiModule() {
    return {
        id: todoApiConstants.id,
        reducerMap: {
            [todoApiConstants.id]: todoApiReducer,
        },
    };
}