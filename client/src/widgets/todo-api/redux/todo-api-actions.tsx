import { todoApiConstants } from './todo-api-constants';

const types = {
    SET_AUTH_TOKEN: `@@${todoApiConstants.id}/SET_AUTH_TOKEN`,
};

const creators = {
    setAuthToken: (token: string) => ({
        type: types.SET_AUTH_TOKEN,
        payload: token
    }),
};

export const todoApiActions = {
    creators,
    types,
};