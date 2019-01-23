import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import "./style.css";

interface ITodoTitleProps {
    children?: any;
}

export default class TodoTitle extends React.Component<ITodoTitleProps, any> {
    public render() {
        return (
            <div className="todo-title">
                <Typography variant="h3">
                    <FormattedMessage id="app.todo.title" />
                </Typography>
                <Typography variant="h5">
                    <FormattedMessage id="app.todo.headline" />
                </Typography>
            </div>
        );
    };
}
