import { materialSnackbarConstants } from './material-snackbar-constants';

const types = {
    OPEN: `@@${materialSnackbarConstants.id}/OPEN`,
    CLOSE: `@@${materialSnackbarConstants.id}/CLOSE`,
};

const creators = {
    open: (id: string) => (message: any, variant?: string) => ({
        type: types.OPEN,
        payload: {
            id,
            variant,
            message
        },
    }),
    close: (id: string) => () => ({
        type: types.CLOSE,
        payload: {
            id,
        },
    }),
};

export const materialSnackbarActions = {
    creators,
    types,
};