// import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { get } from "lodash";
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
import { todoSignupConstants } from './redux/todo-signup-constants';
import "./style.css";

interface ITodoSignupProps {
    children?: any;
    intl?: any;
    classes?: any;
    handleSubmit: any;
    redirectTo: (url: string) => void;
    setAuthToken: (token: string) => void;
    submitting: boolean;
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

const required = (value: any) => (value || typeof value === 'number' ? undefined : <FormattedMessage id="app.todo.signup.required" />);
const email = (value: any) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? <FormattedMessage id="app.todo.signup.email.invalid" />
        : undefined;


export class TodoSignup extends React.Component<ITodoSignupProps, any> {

    public componentDidMount() {
        if (!!this.props.authToken) {
            this.props.redirectTo('/app');
        }
    }

    public back = () => {
        this.props.redirectTo('/');
    }

    public submit = async (values: any) => {
        const response = await todoApi.account.signup(values.name, values.email, values.password, values.password_confirmation);
        const json = await response.json();
        if (json.auth_token) {
            this.props.setAuthToken(json.auth_token);
            this.props.redirectTo('/app');
        } else {
            if (get(json, 'error.codes', []).indexOf('password_confirmation_error') !== -1) {
                throw new SubmissionError({
                    password_confirmation: <FormattedMessage id="app.todo.signup.password_confirmation.incorrect" />,
                    _error: 'signup_failure'
                });
            }
            if (get(json, 'error.codes', []).indexOf('email_error') !== -1 && get(json, 'error.email', []).indexOf('has already been taken') !== -1) {
                throw new SubmissionError({
                    email: <FormattedMessage id="app.todo.signup.email.taken" />,
                    _error: 'signup_failure'
                });
            }
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
            <form className="todo-signup" onSubmit={handleSubmit(this.submit)}>
                <Field
                    type="text"
                    name="name"
                    component={TextField} placeholder={formatMessage({
                        id: "app.todo.signup.name"
                    })}
                    margin="normal"
                    validate={[required]}
                    fullWidth={true}
                />
                <Field
                    type="text"
                    name="email"
                    component={TextField} placeholder={formatMessage({
                        id: "app.todo.signup.email"
                    })}
                    margin="normal"
                    validate={[required, email]}
                    fullWidth={true}
                />
                <Field
                    type="password"
                    name="password"
                    component={TextField}
                    placeholder={formatMessage({
                        id: "app.todo.signup.password"
                    })}
                    margin="normal"
                    validate={[required]}
                    fullWidth={true}
                />
                <Field
                    type="password"
                    name="password_confirmation"
                    component={TextField}
                    placeholder={formatMessage({
                        id: "app.todo.signup.password_confirmation"
                    })}
                    margin="normal"
                    validate={[required]}
                    fullWidth={true}
                />
                <Grid container={true} style={{ margin: "8px 0" }}>
                    <Grid item={true} xs={6}>
                        <Button color="secondary" onClick={this.back}>
                            <FormattedMessage id="app.todo.signup.back" />
                        </Button>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Button color="primary" type="submit" style={{ float: 'right' }}>
                            <FormattedMessage id="app.todo.signup" />
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
        formValues: getFormValues(todoSignupConstants.id)(state),
        submitting: isSubmitting(todoSignupConstants.id)(state),
    }),
    (dispatch: any) => ({
        redirectTo: bindActionCreators(push, dispatch),
        setAuthToken: bindActionCreators(todoApiActions.creators.setAuthToken, dispatch),
    })
)(reduxForm({
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    form: todoSignupConstants.id,
    // validate,
    // asyncValidate,
})(injectIntl(withStyles(styles)(TodoSignup) as any) as any));