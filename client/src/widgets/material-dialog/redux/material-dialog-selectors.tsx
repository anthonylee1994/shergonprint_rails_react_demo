import { get } from 'lodash';
import { materialDialogConstants } from './material-dialog-constants';

const isVisible = (id: string) => (state: any): boolean => get(state, `${materialDialogConstants.id}.${id}.visible`, false);
const getData = (id: string) => (state: any): any => get(state, `${materialDialogConstants.id}.${id}.data`);

export const materialDialogSelectors = {
    isVisible,
    getData
};