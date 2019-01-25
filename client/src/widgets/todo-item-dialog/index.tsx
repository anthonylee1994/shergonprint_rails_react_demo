import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { get } from "lodash";
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { destroy, Field, initialize, reduxForm, SubmissionError } from 'redux-form';
import { Checkbox, TextField } from 'redux-form-material-ui';
import createMaterialDialog from '../material-dialog';
import { materialDialogActions } from '../material-dialog/redux/material-dialog-actions';
import { materialDialogSelectors } from '../material-dialog/redux/material-dialog-selectors';
import { materialSnackbarActions } from '../material-snackbar/redux/material-snackbar-actions';
import { todoApi } from '../todo-api';
import { todoAppActions } from '../todo-app/redux/todo-app-actions';
import { todoAppConstants } from '../todo-app/redux/todo-app-constants';
import { todoAppSelectors } from '../todo-app/redux/todo-app-selectors';

interface ITodoItemDialogProps {
    todoData?: any;
    intl: any;
    handleSubmit: any;
    status?: any;
    error?: any;
    destroyForm: () => void;
    initForm: (form: any) => void;
    showSnackbar: (message: string, variant?: string) => void;
    createRequest: (todoId: string, data: any) => void;
    createSuccess: (data: any) => void;
    updateRequest: (todoId: string, data: any) => void;
    updateSuccess: (data: any) => void;
    onClose: () => void;
}

const styles = (theme: any): any => ({
});

const required = (value: any) => (value || typeof value === 'number' ? undefined : <FormattedMessage id="app.todo.app.required" />);

class TodoItemDialog extends React.Component<ITodoItemDialogProps, any> {

    public Dialog: any = createMaterialDialog(todoAppConstants.id + '-item');

    public componentDidUpdate(prevProps: ITodoItemDialogProps) {
        const { todoData, initForm } = this.props;
        if (!get(prevProps, 'todoData.item') && get(todoData, 'item')) {
            initForm(get(todoData, 'item'));
        }
    }

    public onClose = () => {
        const { onClose, destroyForm } = this.props;
        destroyForm();
        onClose();
    };

    public submit = async (values: any) => {

        const { intl, createRequest, createSuccess, updateRequest, updateSuccess, showSnackbar, todoData } = this.props;
        const { formatMessage } = intl;
        const todoId = get(todoData, 'todoId');

        if (!get(todoData, 'item')) {
            createRequest(todoId, values);
            const response = await todoApi.todo.items.save(todoId, values);
            const json = await response.json();
            if (!get(json, 'error')) {
                createSuccess(json);
                this.onClose();
                showSnackbar(
                    formatMessage({
                        id: 'app.todo.app.todos.items.create.success',
                    }, {
                            name: get(values, 'name')
                        }),
                    'success'
                );
            } else {
                if (get(json, 'error.codes', []).indexOf('name_error') !== -1 && get(json, 'error.name', []).indexOf('has already been taken') !== -1) {
                    throw new SubmissionError({
                        name: <FormattedMessage
                            id="app.todo.app.field.taken"
                            values={{
                                field: formatMessage({
                                    id: 'app.todo.app.todos.items.field.name'
                                })
                            }}
                        />,
                        _error: 'create_todo_item_failure'
                    });
                }
            }
        } else {
            updateRequest(todoId, values);
            const response = await todoApi.todo.items.update(todoId, get(todoData, 'item.id'), values);
            const json = await response.json();
            if (!get(json, 'error')) {
                updateSuccess(json);
                this.onClose();
                showSnackbar(
                    formatMessage({
                        id: 'app.todo.app.todos.items.update.success',
                    }, {
                            name: get(values, 'name')
                        }),
                    'success'
                );
            } else {
                if (get(json, 'error.codes', []).indexOf('name_error') !== -1 && get(json, 'error.name', []).indexOf('has already been taken') !== -1) {
                    throw new SubmissionError({
                        name: <FormattedMessage
                            id="app.todo.app.field.taken"
                            values={{
                                field: formatMessage({
                                    id: 'app.todo.app.todos.items.field.name'
                                })
                            }}
                        />,
                        _error: 'update_todo_item_failure'
                    });
                }
            }
        }
    };

    public renderCircularProgress = () => {
        return (
            <div style={{ textAlign: "center", margin: '16px 0' }}>
                <CircularProgress />
            </div>
        );
    };

    public render() {
        const { todoData, intl, handleSubmit, status } = this.props;
        const { formatMessage } = intl;
        const Dialog = this.Dialog;

        const isLoading = !!get(todoData, 'item') ? get(status, 'CREATE_TODO_ITEM') === 'request' : get(status, 'UPDATE_TODO_ITEM') === 'request';

        return (
            <Dialog fullWidth={true} maxWidth="xs" onClose={this.onClose}>
                <DialogTitle>
                    {!!get(todoData, 'item') ? <FormattedMessage id="app.todo.app.todos.items.edit" /> : <FormattedMessage id="app.todo.app.todos.items.add" />}
                </DialogTitle>
                <DialogContent>
                    {isLoading ? this.renderCircularProgress() : (
                        <form onSubmit={handleSubmit(this.submit)}>
                            <Field
                                type="text"
                                name="name"
                                component={TextField}
                                placeholder={formatMessage({
                                    id: "app.todo.app.todos.items.field.name"
                                })}
                                margin="normal"
                                fullWidth={true}
                                validate={[required]}
                            />
                            {!!get(todoData, 'item') ? <FormControlLabel
                                control={<Field
                                    name="done"
                                    component={Checkbox}
                                    margin="normal"
                                />}
                                label={formatMessage({
                                    id: "app.todo.app.todos.items.field.done"
                                })}
                            /> : null}
                        </form>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onClose}>
                        <FormattedMessage id="app.todo.app.cancel" />
                    </Button>
                    <Button onClick={handleSubmit(this.submit)} color="primary">
                        {!!get(todoData, 'item') ? <FormattedMessage id="app.todo.app.update" /> : <FormattedMessage id="app.todo.app.create" />}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };
}

export default connect(
    (state) => ({
        errors: todoAppSelectors.getErrors(state),
        status: todoAppSelectors.getStatus(state),
        todoData: materialDialogSelectors.getData(todoAppConstants.id + '-item')(state),
    }),
    (dispatch) => ({
        onClose: bindActionCreators(materialDialogActions.creators.close(todoAppConstants.id + '-item'), dispatch),
        showSnackbar: bindActionCreators(materialSnackbarActions.creators.open(todoAppConstants.id), dispatch),
        createRequest: bindActionCreators(todoAppActions.creators.createTodoItem.request, dispatch),
        createSuccess: bindActionCreators(todoAppActions.creators.createTodoItem.success, dispatch),
        updateRequest: bindActionCreators(todoAppActions.creators.updateTodoItem.request, dispatch),
        updateSuccess: bindActionCreators(todoAppActions.creators.updateTodoItem.success, dispatch),
        destroyForm: bindActionCreators(() => destroy(todoAppConstants.id + '-item'), dispatch),
        initForm: bindActionCreators((data: any) => initialize(todoAppConstants.id + '-item', data), dispatch),
    })
)(reduxForm({
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    form: todoAppConstants.id + '-item',
    // validate,
    // asyncValidate,
})(injectIntl(withStyles(styles)(TodoItemDialog) as any) as any));