import * as React from 'react';
import TodoSignup from '../widgets/todo-signup';
import TodoTitle from '../widgets/todo-title';

export default class Signup extends React.Component<undefined, undefined> {

    public componentDidMount() {
        document.body.style.backgroundColor = "#f2f2f2";
    }
    public componentWillUnmount() {
        document.body.style.backgroundColor = "transparent";
    }

    public render() {
        return (
            <div>
                <TodoTitle />
                <TodoSignup />
            </div>
        );
    }
}
