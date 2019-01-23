// import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Field, getFormValues, isSubmitting, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { todoSignupConstants } from './redux/todo-signup-constants';
import "./style.css";

interface ITodoSignupProps {
    children?: any;
    intl?: any;
    classes?: any;
    redirectTo: (url: string) => void;
}

const styles = (theme: any) => ({
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});


export class TodoSignup extends React.Component<ITodoSignupProps, any> {

    public back = () => {
        this.props.redirectTo('/');
    }

    public render() {

        const { intl, classes } = this.props;

        const { formatMessage } = intl;

        return (
            <form className="todo-signup">
                <Field
                    type="text"
                    name="name"
                    component={TextField} placeholder={formatMessage({
                        id: "app.todo.signup.name"
                    })}
                    margin="normal"
                    fullWidth={true}
                />
                <Field
                    type="email"
                    name="email"
                    component={TextField} placeholder={formatMessage({
                        id: "app.todo.signup.email"
                    })}
                    margin="normal"
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
        formValues: getFormValues(todoSignupConstants.id)(state),
        submitting: isSubmitting(todoSignupConstants.id)(state),
    }),
    (dispatch: any) => ({
        redirectTo: bindActionCreators(push, dispatch)
    })
)(reduxForm({
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    form: todoSignupConstants.id,
    // validate,
    // asyncValidate,
})(injectIntl(withStyles(styles)(TodoSignup) as any) as any));