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
        signup: (name: string, email: string, password: string) => fetch(todoApiBaseUrl + '/signup', {
            ...generalFetchContext,
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password
            })
        }),
    },
    todo: {
        items: {
            list: (token: string, todoId: number) => (page = 0) => fetch(todoApiBaseUrl + `/todos/${todoId}/?page=${page}`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            }),
            show: (token: string, todoId: number) => (id: number) => fetch(todoApiBaseUrl + `/todos/${todoId}/${id}`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            }),
            save: (token: string, todoId: number) => ({ name }: { name: string }) => fetch(todoApiBaseUrl + `/todos/${todoId}/`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    name,
                })
            }),
            update: (token: string, todoId: number) => (id: number, { name, done }: { name: string, done: boolean }) => fetch(todoApiBaseUrl + `/todos/${todoId}/${id}`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${token}`,
                },
                method: 'PATCH',
                body: JSON.stringify({
                    name,
                    done
                })
            }),
            delete: (token: string, todoId: number) => (id: number) => fetch(todoApiBaseUrl + `/todos/${todoId}/${id}`, {
                ...generalFetchContext,
                headers: {
                    ...generalFetchContext.headers,
                    Authorization: `Bearer ${token}`,
                },
                method: 'DELETE'
            }),
        },
        list: (token: string) => (page = 0) => fetch(todoApiBaseUrl + `/todos/?page=${page}`, {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
        }),
        show: (token: string) => (id: number) => fetch(todoApiBaseUrl + `/todos/${id}`, {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
        }),
        save: (token: string) => ({ title }: { title: string }) => fetch(todoApiBaseUrl + '/todos', {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify({
                title,
            })
        }),
        update: (token: string) => (id: number, { title }: { title: string }) => fetch(todoApiBaseUrl + `/todos/${id}`, {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
                title,
            })
        }),
        delete: (token: string) => (id: number) => fetch(todoApiBaseUrl + `/todos/${id}`, {
            ...generalFetchContext,
            headers: {
                ...generalFetchContext.headers,
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE'
        }),
    }
};