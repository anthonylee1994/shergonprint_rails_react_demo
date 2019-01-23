import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

export const history = createHashHistory();

export function getRouterModule() {
    return {
        id: "router",
        middlewares: [
            routerMiddleware(history)
        ],
        reducerMap: {
            router: connectRouter(history)
        }
    };
}