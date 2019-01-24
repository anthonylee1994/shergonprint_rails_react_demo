import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Field, getFormValues, isSubmitting, reduxForm, SubmissionError } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { todoApi } from '../todo-api';
import { todoApiActions } from '../todo-api/redux/todo-api-actions';
import { todoApiSelectors } from '../todo-api/redux/todo-api-selectors';
import { todoLoginConstants } from './redux/todo-login-constants';
import "./style.css";

interface ITodoLoginProps {
    children?: any;
    intl?: any;
    classes?: any;
    handleSubmit?: any;
    redirectTo: (url: string) => void;
    submitting: boolean;
    setAuthToken: (token: string) => void;
    authToken?: string;
}

const styles = (theme: any) => ({
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});


export class TodoLogin extends React.Component<ITodoLoginProps, any> {

    public componentDidMount() {
        if (!!this.props.authToken) {
            this.props.redirectTo('/app');
        }
    }

    public signup = () => {
        this.props.redirectTo('/signup');
    }

    public submit = async (values: any) => {
        const response = await todoApi.account.login(values.email, values.password);
        const json = await response.json();
        if (json.auth_token) {
            this.props.setAuthToken(json.auth_token);
            this.props.redirectTo('/app');
        } else {
            throw new SubmissionError({
                email: ' ',
                password: <FormattedMessage id="app.todo.login.password.incorrect" />,
                _error: 'login_failure'
            });
        }
    };

    public render() {

        const { intl, classes, handleSubmit, submitting } = this.props;

        const { formatMessage } = intl;

        if (submitting) {
            return (
                <div style={{ textAlign: "center", margin: '16px 0' }}>
                    <CircularProgress size={80} />
                </div>
            );
        }

        return (
            <form className="todo-login" onSubmit={handleSubmit(this.submit)}>
                <Field
                    type="email"
                    name="email"
                    component={TextField} placeholder={formatMessage({
                        id: "app.todo.login.email"
                    })}
                    margin="normal"
                    fullWidth={true}
                />
                <Field
                    type="password"
                    name="password"
                    component={TextField}
                    placeholder={formatMessage({
                        id: "app.todo.login.password"
                    })}
                    margin="normal"
                    fullWidth={true}
                />
                <Grid container={true} style={{ margin: "8px 0" }}>
                    <Grid item={true} xs={6}>
                        <Button color="secondary" onClick={this.signup}>
                            <FormattedMessage id="app.todo.signup" />
                        </Button>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Button color="primary" type="submit" style={{ float: 'right' }}>
                            <FormattedMessage id="app.todo.login" />
                            <Icon className={classes.rightIcon}>send</Icon>
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    };
}

export default connect(
    (state) => ({
        authToken: todoApiSelectors.getAuthToken(state),
        formValues: getFormValues(todoLoginConstants.id)(state),
        submitting: isSubmitting(todoLoginConstants.id)(state),
    }),
    (dispatch: any) => ({
        redirectTo: bindActionCreators(push, dispatch),
        setAuthToken: bindActionCreators(todoApiActions.creators.setAuthToken, dispatch),
    })
)(reduxForm({
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    form: todoLoginConstants.id,
    // validate,
    // asyncValidate,
})(injectIntl(withStyles(styles)(TodoLogin) as any) as any));