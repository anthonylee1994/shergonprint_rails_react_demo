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
import { materialDialogActions } from '../material-dialog/redux/material-dialog-actions';
import createMaterialSnackbar from '../material-snackbar';
import { materialSnackbarActions } from '../material-snackbar/redux/material-snackbar-actions';
import { todoApi } from '../todo-api';
import { todoApiActions } from '../todo-api/redux/todo-api-actions';
import { todoApiSelectors } from '../todo-api/redux/todo-api-selectors';
import TodoDialog from '../todo-dialog';
import TodoItemDialog from '../todo-item-dialog';
import { todoAppActions } from './redux/todo-app-actions';
import { todoAppConstants } from './redux/todo-app-constants';
import { todoAppSelectors } from './redux/todo-app-selectors';
import "./style.css";

interface ITodoAppProps {
    children?: any;
    classes?: any;
    redirectTo: (url: string) => void;
    clearAuthToken: () => void;
    loadUserInfo: () => void;
    loadTodos: () => void;
    removeTodo: (data: any) => void;
    removeTodoItem: (todoId: number, data: any) => void;
    showSnackbar: (message: string, variant?: string) => void;
    openTodoDialog: (data?: any) => void;
    openTodoItemDialog: (data?: any) => void;
    updateItemRequest: (todoId: number, data: any) => void;
    updateItemSuccess: (data: any) => void;
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

    public MaterialSnackbar: any = createMaterialSnackbar(todoAppConstants.id);

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

    public removeTodo = (todo: any) => {
        return () => this.props.removeTodo(todo);
    };

    public removeTodoItem = (todoId: number, item: any) => {
        return () => this.props.removeTodoItem(todoId, item);
    };

    public renderTodoItem = (todoId: number, item: any, key: number) => {
        const { intl } = this.props;
        const { formatMessage } = intl;
        const isDone = !!get(item, 'done');
        return (
            <ListItem key={key} button={true} onClick={this.onMarkDone(todoId, item)}>
                <Checkbox
                    checked={isDone}
                />
                <ListItemText primary={get(item, 'name')} className={isDone ? 'done-item' : ''} />
                <ListItemSecondaryAction>
                    <Tooltip
                        title={formatMessage({
                            id: 'app.todo.app.todos.items.edit'
                        })}
                    >
                        <IconButton onClick={this.openEditTodoItemDialog(todoId, item)}>
                            <CreateIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title={formatMessage({
                            id: 'app.todo.app.todos.items.remove'
                        })}
                    >
                        <IconButton onClick={this.removeTodoItem(todoId, item)}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        );
    };

    public onMarkDone = (todoId: number, item: any) => {
        return async () => {
            const { updateItemRequest, updateItemSuccess, showSnackbar, intl } = this.props;
            const { formatMessage } = intl;
            const values = {
                ...item,
                done: !get(item, 'done', false)
            };
            updateItemRequest(todoId, values);
            const response = await todoApi.todo.items.update(todoId, get(item, 'id'), values);
            const json = await response.json();
            if (!get(json, 'error')) {
                updateItemSuccess(json);
                showSnackbar(
                    formatMessage({
                        id: 'app.todo.app.todos.items.update.success',
                    }, {
                            name: get(values, 'name')
                        }),
                    'success'
                );
            } else {
                showSnackbar(
                    formatMessage({
                        id: 'app.todo.app.todos.items.update.error',
                    }, {
                            name: get(values, 'name')
                        }),
                    'error'
                );
            }
        };
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
                            <IconButton onClick={this.removeTodo(list)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    title={
                        <Typography variant="h5">
                            <Tooltip title={formatMessage({
                                id: "app.todo.app.todos.edit"
                            })}>
                                <span style={{ cursor: 'pointer' }} onClick={this.openEditTodoDialog(list)}>{get(list, 'title')}</span>
                            </Tooltip>
                        </Typography>
                    }
                    subheader={formatRelative(get(list, 'created_at'))}
                    style={{ paddingBottom: 0 }}
                />
                <CardContent style={{ padding: 0 }}>
                    {listItems.length > 0 ? (
                        <List>
                            {listItems.map((item: any, i: number) => this.renderTodoItem(get(list, 'id'), item, i))}
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
                    <Button color="primary" onClick={this.openCreateTodoItemDialog(get(list, 'id'))}>
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

    public renderSnackbar = () => {
        const MaterialSnackbar = this.MaterialSnackbar;
        return (
            <MaterialSnackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                autoHideDuration={5000}
            />
        );
    };

    public openCreateTodoDialog = () => {
        return () => this.props.openTodoDialog();
    };

    public openCreateTodoItemDialog = (todoId: number) => {
        return () => this.props.openTodoItemDialog({
            todoId,
        });
    };

    public openEditTodoDialog = (data: any) => {
        return () => this.props.openTodoDialog(data);
    };

    public openEditTodoItemDialog = (todoId: number, item: any) => {
        return () => this.props.openTodoItemDialog({
            todoId,
            item,
        });
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
                                <Typography variant="h6" color="textSecondary">
                                    <FormattedMessage id="app.todo.app.todos.empty" />
                                </Typography>
                            </div>
                        )
                    )}
                </div>
                <Tooltip title={formatMessage({
                    id: "app.todo.app.todos.add"
                })}>
                    <Fab color="secondary" className={classes.fab} onClick={this.openCreateTodoDialog()}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                {this.renderSnackbar()}
                <TodoDialog />
                <TodoItemDialog />
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
        removeTodoItem: bindActionCreators(todoAppActions.creators.removeTodoItem.request, dispatch),
        removeTodo: bindActionCreators(todoAppActions.creators.removeTodo.request, dispatch),
        showSnackbar: bindActionCreators(materialSnackbarActions.creators.open(todoAppConstants.id), dispatch),
        openTodoDialog: bindActionCreators(materialDialogActions.creators.open(todoAppConstants.id + '-todo'), dispatch),
        openTodoItemDialog: bindActionCreators(materialDialogActions.creators.open(todoAppConstants.id + '-item'), dispatch),
        updateItemRequest: bindActionCreators(todoAppActions.creators.updateTodoItem.request, dispatch),
        updateItemSuccess: bindActionCreators(todoAppActions.creators.updateTodoItem.success, dispatch),
    })
)(injectIntl(withStyles(styles)(TodoApp) as any));