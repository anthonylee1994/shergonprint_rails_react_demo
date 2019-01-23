import { todoTitleConstants } from './todo-title-constants';
import { todoTitleLang } from './todo-title-lang';

export function getTodoTitleModule() {
    return {
        id: todoTitleConstants.id,
        lang: todoTitleLang,
    };
}