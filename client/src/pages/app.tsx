import * as React from 'react';
import TodoApp from '../widgets/todo-app';

export default class App extends React.Component<undefined, undefined> {

    public componentDidMount() {
        document.body.style.backgroundColor = "#f2f2f2";
    }
    public componentWillUnmount() {
        document.body.style.backgroundColor = "transparent";
    }

    public render() {
        return (
            <TodoApp/>
        );
    }
}
