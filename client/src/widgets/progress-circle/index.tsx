import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import "./style.css";

interface IProgressCircleProps {
    classes?: any;
};

const styles = (theme: any) => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class ProgressCircle extends React.Component<IProgressCircleProps, any> {
    public render() {
        const { classes } = this.props;
        return (
            <div className="progress-circle">
                <CircularProgress className={classes.progress} size={80}/>
            </div>
        );
    };
}

export default withStyles(styles)(ProgressCircle);