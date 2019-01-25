import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { get } from "lodash";
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { destroy, Field, initialize, reduxForm, SubmissionError } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import createMaterialDialog from '../material-dialog';
import { materialDialogActions } from '../material-dialog/redux/material-dialog-actions';
import { materialDialogSelectors } from '../material-dialog/redux/material-dialog-selectors';
import { materialSnackbarActions } from '../material-snackbar/redux/material-snackbar-actions';
import { todoApi } from '../todo-api';
import { todoAppActions } from '../todo-app/redux/todo-app-actions';
import { todoAppConstants } from '../todo-app/redux/todo-app-constants';
import { todoAppSelectors } from '../todo-app/redux/todo-app-selectors';

interface ITodoDialogProps {
    todo?: any;
    intl: any;
    handleSubmit: any;
    status?: any;
    error?: any;
    destroyForm: () => void;
    initForm: (form: any) => void;
    showSnackbar: (message: string, variant?: string) => void;
    createRequest: (data: any) => void;
    createSuccess: (data: any) => void;
    updateRequest: (data: any) => void;
    updateSuccess: (data: any) => void;
    onClose: () => void;
}

const styles = (theme: any): any => ({
});

const required = (value: any) => (value || typeof value === 'number' ? undefined : <FormattedMessage id="app.todo.app.required" />);

class TodoDialog extends React.Component<ITodoDialogProps, any> {

    public Dialog: any = createMaterialDialog(todoAppConstants.id + '-todo');

    public componentDidUpdate(prevProps: ITodoDialogProps) {
        const { todo, initForm } = this.props;
        if (!prevProps.todo && todo) {
            initForm(todo);
        }
    }

    public onClose = () => {
        const { onClose, destroyForm } = this.props;
        destroyForm();
        onClose();
    };

    public submit = async (values: any) => {

        const { intl, createRequest, createSuccess, updateRequest, updateSuccess, showSnackbar, todo } = this.props;
        const { formatMessage } = intl;

        if (!todo) {
            createRequest(values);
            const response = await todoApi.todo.save(values);
            const json = await response.json();
            if (!get(json, 'error')) {
                createSuccess(json);
                this.onClose();
                showSnackbar(
                    formatMessage({
                        id: 'app.todo.app.todos.create.success',
                    }, {
                            name: get(values, 'title')
                        }),
                    'success'
                );
            } else {
                if (get(json, 'error.codes', []).indexOf('title_error') !== -1 && get(json, 'error.title', []).indexOf('has already been taken') !== -1) {
                    throw new SubmissionError({
                        title: <FormattedMessage
                            id="app.todo.app.field.taken"
                            values={{
                                field: formatMessage({
                                    id: 'app.todo.app.todos.field.title'
                                })
                            }}
                        />,
                        _error: 'create_todo_failure'
                    });
                }
            }
        } else {
            updateRequest(values);
            const response = await todoApi.todo.update(get(todo, 'id'), values);
            const json = await response.json();
            if (!get(json, 'error')) {
                updateSuccess(json);
                this.onClose();
                showSnackbar(
                    formatMessage({
                        id: 'app.todo.app.todos.update.success',
                    }, {
                            name: get(values, 'title')
                        }),
                    'success'
                );
            } else {
                if (get(json, 'error.codes', []).indexOf('title_error') !== -1 && get(json, 'error.title', []).indexOf('has already been taken') !== -1) {
                    throw new SubmissionError({
                        title: <FormattedMessage
                            id="app.todo.app.field.taken"
                            values={{
                                field: formatMessage({
                                    id: 'app.todo.app.todos.field.title'
                                })
                            }}
                        />,
                        _error: 'update_todo_failure'
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
        const { todo, intl, handleSubmit, status } = this.props;
        const { formatMessage } = intl;
        const Dialog = this.Dialog;

        const isLoading = !!todo ? get(status, 'CREATE_TODO') === 'request' : get(status, 'UPDATE_TODO') === 'request';

        return (
            <Dialog fullWidth={true} maxWidth="xs" onClose={this.onClose}>
                <DialogTitle>
                    {!!todo ? <FormattedMessage id="app.todo.app.todos.edit" /> : <FormattedMessage id="app.todo.app.todos.add" />}
                </DialogTitle>
                <DialogContent>
                    {isLoading ? this.renderCircularProgress() : (
                        <form onSubmit={handleSubmit(this.submit)}>
                            <Field
                                type="text"
                                name="title"
                                component={TextField}
                                placeholder={formatMessage({
                                    id: "app.todo.app.todos.field.title"
                                })}
                                margin="normal"
                                fullWidth={true}
                                validate={[required]}
                            />
                        </form>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onClose}>
                        <FormattedMessage id="app.todo.app.cancel" />
                    </Button>
                    <Button onClick={handleSubmit(this.submit)} color="primary">
                        {!!todo ? <FormattedMessage id="app.todo.app.update" /> : <FormattedMessage id="app.todo.app.create" />}
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
        todo: materialDialogSelectors.getData(todoAppConstants.id + '-todo')(state),
    }),
    (dispatch) => ({
        onClose: bindActionCreators(materialDialogActions.creators.close(todoAppConstants.id + '-todo'), dispatch),
        showSnackbar: bindActionCreators(materialSnackbarActions.creators.open(todoAppConstants.id), dispatch),
        createRequest: bindActionCreators(todoAppActions.creators.createTodo.request, dispatch),
        createSuccess: bindActionCreators(todoAppActions.creators.createTodo.success, dispatch),
        updateRequest: bindActionCreators(todoAppActions.creators.updateTodo.request, dispatch),
        updateSuccess: bindActionCreators(todoAppActions.creators.updateTodo.success, dispatch),
        destroyForm: bindActionCreators(() => destroy(todoAppConstants.id + '-todo'), dispatch),
        initForm: bindActionCreators((data: any) => initialize(todoAppConstants.id + '-todo', data), dispatch),
    })
)(reduxForm({
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    form: todoAppConstants.id + '-todo',
    // validate,
    // asyncValidate,
})(injectIntl(withStyles(styles)(TodoDialog) as any) as any));