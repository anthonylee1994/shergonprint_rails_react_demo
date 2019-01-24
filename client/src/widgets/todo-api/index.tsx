import * as ls from 'local-storage';

export const todoApiBaseUrl = "/api";

const generalFetchContext: any = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.todos.v1+json',
    },
    credentials: 'same-origin',
};

export const todoApi = {
    account: {
        login: (email: string, password: string) => fetch(todoApiBaseUrl + '/auth/login', {
            ...generalFetchContext,
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }),
        signup: (name: string, email: string, password: string, passwordConfirmation: string) => fetch(todoApiBaseUrl + '/signup', {
            ...generalFetchContext,
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            })
        }),
        info: () => fetch(todoApiBaseUrl + '/account', {
            ...generalFetchContext,
            method: 'GET',
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${ls.get('auth_token')}`,
            },
        }),
    },
    todo: {
        items: {
            list: (todoId: number) => fetch(todoApiBaseUrl + `/todos/${todoId}/items`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${ls.get('auth_token')}`,
                },
                method: 'GET',
            }),
            show: (todoId: number, id: number) => fetch(todoApiBaseUrl + `/todos/${todoId}/items/${id}`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${ls.get('auth_token')}`,
                },
                method: 'GET',
            }),
            save: (todoId: number, { name }: { name: string }) => fetch(todoApiBaseUrl + `/todos/${todoId}/items`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${ls.get('auth_token')}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    name,
                })
            }),
            update: (todoId: number, id: number, { name, done }: { name: string, done: boolean }) => fetch(todoApiBaseUrl + `/todos/${todoId}/items/${id}`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${ls.get('auth_token')}`,
                },
                method: 'PATCH',
                body: JSON.stringify({
                    name,
                    done
                })
            }),
            delete: (todoId: number, id: number) => fetch(todoApiBaseUrl + `/todos/${todoId}/items/${id}`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${ls.get('auth_token')}`,
                },
                method: 'DELETE'
            }),
        },
        list: () => fetch(todoApiBaseUrl + `/todos`, {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${ls.get('auth_token')}`,
            },
            method: 'GET',
        }),
        show: (id: number) => fetch(todoApiBaseUrl + `/todos/${id}`, {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${ls.get('auth_token')}`,
            },
            method: 'GET',
        }),
        save: ({ title }: { title: string }) => fetch(todoApiBaseUrl + '/todos', {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${ls.get('auth_token')}`,
            },
            method: 'POST',
            body: JSON.stringify({
                title,
            })
        }),
        update: (id: number, { title }: { title: string }) => fetch(todoApiBaseUrl + `/todos/${id}`, {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${ls.get('auth_token')}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
                title,
            })
        }),
        delete: (id: number) => fetch(todoApiBaseUrl + `/todos/${id}`, {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${ls.get('auth_token')}`,
            },
            method: 'DELETE'
        }),
    }
};