// import { offline } from '@redux-offline/redux-offline';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';
import "whatwg-fetch";
import Intl from './widgets/intl';
import { getIntlModule } from './widgets/intl/redux/intl-module';
import { getMaterialDialogModule } from './widgets/material-dialog/redux/material-dialog-module';
import { getMaterialSnackbarModule } from './widgets/material-snackbar/redux/material-snackbar-module';
import MaterialWrapper from './widgets/material-ui';
import ProgressCircle from './widgets/progress-circle/index';
import { getReduxFormModule } from './widgets/redux_form/redux/redux-form-module';
import Router from './widgets/router';
import { getRouterModule } from './widgets/router/redux/router-module';
import { getTodoApiModule } from './widgets/todo-api/redux/todo-api-module';
import { getTodoAppModule } from './widgets/todo-app/redux/todo-app-module';
import { getTodoLoginModule } from './widgets/todo-login/redux/todo-login-module';
import { getTodoSignupModule } from './widgets/todo-signup/redux/todo-signup-module';
import { getTodoTitleModule } from './widgets/todo-title/redux/todo-title-module';

class App extends React.Component<any, any> {

    public store: IModuleStore<any>;

    public router: any = null;

    public constructor(props: any) {
        super(props);

        const routerModule = getRouterModule();
        const intlModule = getIntlModule();
        const reduxFormModule = getReduxFormModule();
        const todoTitleModule = getTodoTitleModule();
        const todoLoginModule = getTodoLoginModule();
        const todoSignupModule = getTodoSignupModule();
        const todoApiModule = getTodoApiModule();
        const todoAppModule = getTodoAppModule();
        const materialSnackbarModule = getMaterialSnackbarModule();
        const materialDialogModule = getMaterialDialogModule();

        this.store = createStore(
            {
                intl: {
                    ...intlModule.initialState,
                    messages: {
                        ...todoTitleModule.lang,
                        ...todoLoginModule.lang,
                        ...todoSignupModule.lang,
                        ...todoAppModule.lang,
                        ...materialSnackbarModule.lang,
                        ...materialDialogModule.lang,
                    },
                },
            },
            [
                // offline(offlineConfig) as any
            ],
            [
                getThunkExtension(),
                getSagaExtension()
            ],
            routerModule,
            intlModule,
            reduxFormModule,
            todoApiModule,
            todoAppModule,
            materialSnackbarModule,
            materialDialogModule
        );
    }

    public componentDidMount() {
        document.body.style.backgroundImage = "url('./images/background.jpg')";
    }

    public render() {
        return (
            <Provider store={this.store}>
                <Intl>
                    <MaterialWrapper>
                        <Router>
                            <Switch>
                                <Route exact={true} path="/signup" component={Loadable({
                                    loader: () => import('./pages/signup'),
                                    loading: ProgressCircle
                                } as any)} />
                                <Route exact={true} path="/app" component={Loadable({
                                    loader: () => import('./pages/app'),
                                    loading: ProgressCircle
                                } as any)} />
                                <Route path="/" component={Loadable({
                                    loader: () => import('./pages/login'),
                                    loading: ProgressCircle
                                } as any)} />
                            </Switch>
                        </Router>
                    </MaterialWrapper>
                </Intl>
            </Provider>
        );
    }
}

export default App;
