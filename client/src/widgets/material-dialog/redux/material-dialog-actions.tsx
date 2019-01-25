import { materialDialogConstants } from './material-dialog-constants';

const types = {
    OPEN: `@@${materialDialogConstants.id}/OPEN`,
    CLOSE: `@@${materialDialogConstants.id}/CLOSE`,
};

const creators = {
    open: (id: string) => (data: any) => ({
        type: types.OPEN,
        payload: {
            id,
            data
        },
    }),
    close: (id: string) => () => ({
        type: types.CLOSE,
        payload: {
            id,
        },
    }),
};

export const materialDialogActions = {
    creators,
    types,
};