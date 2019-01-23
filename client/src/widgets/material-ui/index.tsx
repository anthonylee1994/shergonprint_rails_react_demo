import purple from '@material-ui/core/colors/purple';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

interface IMaterialUIProps {
    children?: any;
}

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: purple,
        secondary: {
            main: '#f44336',
        },
    },
});

export default class MaterialWrapper extends React.Component<IMaterialUIProps, any> {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                {this.props.children}
            </MuiThemeProvider>
        );
    };
}
