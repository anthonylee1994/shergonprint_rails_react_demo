import { todoLoginConstants } from './todo-login-constants';
import { todoLoginLang } from './todo-login-lang';

export function getTodoLoginModule() {
    return {
        id: todoLoginConstants.id,
        lang: todoLoginLang,
    };
}