import { get } from 'lodash';
import { materialSnackbarConstants } from './material-snackbar-constants';

const isVisible = (id: string) => (state: any): boolean => get(state, `${materialSnackbarConstants.id}.${id}.visible`);
const getMessage = (id: string) => (state: any) => get(state, `${materialSnackbarConstants.id}.${id}.message`);
const getVariant = (id: string) => (state: any) => get(state, `${materialSnackbarConstants.id}.${id}.variant`);

export const materialSnackbarSelectors = {
    isVisible,
    getMessage,
    getVariant,
};