import * as React from 'react';
import { IntlProvider } from 'react-intl-redux';

export interface IIntlProps {
    children?: any;
}

export default class Intl extends React.Component<IIntlProps, any> {
    public render() {
        return (
            <IntlProvider>
                {this.props.children}
            </IntlProvider>
        );
    }
}
