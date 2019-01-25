import { Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { materialDialogActions } from './redux/material-dialog-actions';
import { materialDialogSelectors } from './redux/material-dialog-selectors';

interface IMaterialDialogProps {
    classes: any;
    children?: any;
    open: boolean;
    handleClose: () => void;
    [x: string]: any;
}

const styles = (theme: any) => ({
});

class MaterialDialog extends React.Component<IMaterialDialogProps, any> {
    public render() {
        const { open, onClose, handleClose, children, ...otherProps } = this.props;

        return (
            <Dialog
                open={open}
                onClose={onClose || handleClose}
                {...otherProps}
            >
                {children}
            </Dialog>
        );
    };
}

export default function createMaterialDialog(id: string) {
    return connect(
        (state) => ({
            open: materialDialogSelectors.isVisible(id)(state),
        }),
        (dispatch) => ({
            handleClose: bindActionCreators(materialDialogActions.creators.close(id), dispatch),
        })
    )(withStyles(styles)(MaterialDialog) as any);
};