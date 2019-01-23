import { reducer as formReducer } from 'redux-form';

export function getReduxFormModule() {
    return {
        id: 'redux_form',
        reducerMap: {
            form: formReducer,
        }
    };
}