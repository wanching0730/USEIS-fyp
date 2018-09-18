import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import registerReducer from './register-reducer';
import dataReducer from './data-reducer';

const allReducers = combineReducers({
    auth: authReducer,
    registerReducer: registerReducer,
    dataReducer: dataReducer
});

export default allReducers;