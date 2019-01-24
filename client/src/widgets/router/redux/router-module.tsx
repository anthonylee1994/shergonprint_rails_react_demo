import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

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