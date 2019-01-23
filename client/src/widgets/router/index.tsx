import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { history } from './redux/router-module';

export interface IRouterProps {
    children?: any;
}

export default class Router extends React.Component<IRouterProps, any> {
    public render() {
        return (
            <ConnectedRouter history={history}>
                {this.props.children}
            </ConnectedRouter>
        );
    }
}
