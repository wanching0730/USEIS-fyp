import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import registerReducer from './register-reducer';
import dataReducer from './data-reducer';
import createReducer from './create-reducer';
import deleteReducer from './delete-reducer';

const allReducers = combineReducers({
    auth: authReducer,
    register: registerReducer,
    data: dataReducer,
    create: createReducer,
    delete: deleteReducer
});

export default allReducers;