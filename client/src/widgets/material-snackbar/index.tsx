import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { materialSnackbarActions } from './redux/material-snackbar-actions';
import { materialSnackbarSelectors } from './redux/material-snackbar-selectors';

interface IMaterialSnackbarProps {
    classes: any;
    children?: any;
    open: boolean;
    anchorOrigin: SnackbarOrigin;
    message?: any;
    action?: any;
    className: any;
    autoHideDuration?: number;
    ContentProps?: any;
    variant: string;
    intl: any;
    onClose: () => void;
}

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = (theme: any) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class MaterialSnackbar extends React.Component<IMaterialSnackbarProps, any> {
    public render() {
        const { open, className, anchorOrigin, variant, onClose, message, action, autoHideDuration, ContentProps, classes, intl } = this.props;
        const Icon = variant ? variantIcon[variant] : null;

        const { formatMessage } = intl;

        return (
            <Snackbar
                anchorOrigin={anchorOrigin}
                open={open}
                onClose={onClose}
                ContentProps={ContentProps}
                autoHideDuration={autoHideDuration}
            >
                <SnackbarContent
                    className={classNames(classes[variant], className)}
                    aria-describedby="client-snackbar"
                    message={
                        <span className={classes.message}>
                            {!!Icon ? <Icon className={classNames(classes.icon, classes.iconVariant)} /> : null}
                            {message}
                        </span>
                    }
                    action={action || [
                        <IconButton
                            key='app.snackbar.close'
                            aria-label={formatMessage({
                                id: 'app.snackbar.close'
                            })}
                            color="inherit"
                            className={classes.close}
                            onClick={onClose}
                        >
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
    };
}

export default function createMaterialSnackbar(id: string) {
    return connect(
        (state) => ({
            open: materialSnackbarSelectors.isVisible(id)(state),
            message: materialSnackbarSelectors.getMessage(id)(state),
            variant: materialSnackbarSelectors.getVariant(id)(state),
        }),
        (dispatch) => ({
            onClose: bindActionCreators(materialSnackbarActions.creators.close(id), dispatch),
        })
    )(injectIntl(withStyles(styles)(MaterialSnackbar) as any));
};