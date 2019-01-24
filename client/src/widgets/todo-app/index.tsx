import { CardActions, CardContent, CardHeader, Checkbox, CircularProgress, Fab, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { push } from 'connected-react-router';
import { get } from "lodash";
import * as React from 'react';
import ContentLoader from 'react-content-loader';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { todoApiActions } from '../todo-api/redux/todo-api-actions';
import { todoApiSelectors } from '../todo-api/redux/todo-api-selectors';
import { todoAppActions } from './redux/todo-app-actions';
import { todoAppSelectors } from './redux/todo-app-selectors';
import "./style.css";

interface ITodoAppProps {
    children?: any;
    classes?: any;
    redirectTo: (url: string) => void;
    clearAuthToken: () => void;
    loadUserInfo: () => void;
    loadTodos: () => void;
    removeTodo: (id: number) => void;
    authToken?: string;
    userInfo: any;
    todos: any;
    status: any;
    errors: any;
    intl: any;
}

const styles = (theme: any): any => ({
    grow: {
        flexGrow: 1,
    },
    card: {
        margin: theme.spacing.unit * 2,
    },
    actions: {
        display: 'flex',
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    fab: {
        position: 'fixed',
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 3,
    }
});

export class TodoApp extends React.Component<ITodoAppProps, any> {

    public signout = () => {
        this.props.clearAuthToken();
        this.props.redirectTo('/');
    };

    public componentDidMount() {
        if (!this.props.authToken) {
            this.signout();
        }
        this.props.loadUserInfo();
        this.props.loadTodos();
    }

    public removeTodo = (id: number) => {
        return () => this.props.removeTodo(id);
    };

    public renderTodoItem = (item: any, key: number) => {
        const { intl } = this.props;
        const { formatMessage } = intl;
        return (
            <ListItem key={key} button={true} onClick={this.hello}>
                <Checkbox
                    checked={!!get(item, 'done')}
                />
                <ListItemText primary={get(item, 'name')} />
                <ListItemSecondaryAction>
                    <Tooltip title={formatMessage({
                        id: 'app.todo.app.todos.items.edit'
                    })}>
                        <IconButton>
                            <CreateIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={formatMessage({
                        id: 'app.todo.app.todos.items.remove'
                    })}>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        );
    };

    public renderTodoList = (list: any, key: number) => {
        const { classes, intl } = this.props;
        const { formatRelative, formatMessage } = intl;
        const listItems = get(list, 'items', []);
        return (
            <Card elevation={1} className={classes.card} key={key}>
                <CardHeader
                    action={
                        <Tooltip title={formatMessage({
                            id: "app.todo.app.todos.remove"
                        })}>
                            <IconButton onClick={this.removeTodo(get(list, 'id'))}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    title={
                        <Typography variant="h5">
                            <Tooltip title={formatMessage({
                                id: "app.todo.app.todos.edit"
                            })}>
                                <span style={{ cursor: 'pointer' }}>{get(list, 'title')}</span>
                            </Tooltip>
                        </Typography>
                    }
                    subheader={formatRelative(get(list, 'created_at'))}
                    style={{ paddingBottom: 0 }}
                />
                <CardContent style={{ padding: 0 }}>
                    {listItems.length > 0 ? (
                        <List>
                            {listItems.map(this.renderTodoItem)}
                        </List>
                    ) : (
                            <div style={{ padding: '32px 16px', textAlign: 'center' }}>
                                <Typography variant="h6" color="textSecondary" style={{ fontWeight: 'normal', fontSize: 18 }}>
                                    <FormattedMessage id='app.todo.app.todos.items.empty' />
                                </Typography>
                            </div>
                        )}
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button color="primary">
                        <AddIcon className={classes.leftIcon} />
                        <FormattedMessage id='app.todo.app.todos.items.add' />
                    </Button>
                </CardActions>
            </Card>
        );
    };

    public renderCircularProgress = () => {
        return (
            <div style={{ textAlign: "center", margin: '48px 0' }}>
                <CircularProgress size={80} />
            </div>
        );
    };

    public hello = () => {
        alert("hello");
    };

    public render() {
        const { userInfo, status, classes, intl } = this.props;
        const { formatMessage } = intl;

        const isUserInfoLoading = get(status, 'LOAD_USER_INFO') !== 'success';
        const isTodosLoading = get(status, 'LOAD_TODOS') !== 'success' || get(status, 'REMOVE_TODO') === 'request';
        const todos = get(this.props, 'todos', []);

        return (
            <div className="todo-app">
                <AppBar position="fixed">
                    <Toolbar style={{ justifyContent: 'space-between' }}>
                        {isUserInfoLoading ? <ContentLoader
                            height={30}
                            width={150}
                            style={{ width: 150 }}
                            speed={1}
                            primaryColor="#ab47bc"
                            secondaryColor="#bb6bc9"
                        /> : (
                                <Typography variant="h6" color="inherit">
                                    <FormattedMessage id="app.todo.app.title" values={{
                                        name: get(userInfo, 'name')
                                    }} />
                                </Typography>
                            )}
                        <Button color="inherit" onClick={this.signout}>
                            <FormattedMessage id="app.todo.app.signout" />
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className="app-content">
                    {isTodosLoading ? this.renderCircularProgress() : (
                        todos.length > 0 ? todos.map(this.renderTodoList) : (
                            <div style={{ padding: '32px 16px', textAlign: 'center' }}>
                                <Typography variant="h5" color="textSecondary">
                                    <FormattedMessage id="app.todo.app.todos.empty" />
                                </Typography>
                            </div>
                        )
                    )}
                </div>
                <Tooltip title={formatMessage({
                    id: "app.todo.app.todos.add"
                })}>
                    <Fab color="secondary" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
        );
    };
}

export default connect(
    (state) => ({
        errors: todoAppSelectors.getErrors(state),
        status: todoAppSelectors.getStatus(state),
        userInfo: todoAppSelectors.getUserInfo(state),
        todos: todoAppSelectors.getTodos(state),
        authToken: todoApiSelectors.getAuthToken(state),
    }),
    (dispatch) => ({
        redirectTo: bindActionCreators(push, dispatch),
        clearAuthToken: bindActionCreators(todoApiActions.creators.clearAuthToken, dispatch),
        loadUserInfo: bindActionCreators(todoAppActions.creators.loadUserInfo.request, dispatch),
        loadTodos: bindActionCreators(todoAppActions.creators.loadTodos.request, dispatch),
        removeTodo: bindActionCreators(todoAppActions.creators.removeTodo.request, dispatch),
    })
)(injectIntl(withStyles(styles)(TodoApp) as any));