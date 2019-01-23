import { todoSignupConstants } from './todo-signup-constants';
import { todoSignupLang } from './todo-signup-lang';

export function getTodoSignupModule() {
    return {
        id: todoSignupConstants.id,
        lang: todoSignupLang,
    };
}