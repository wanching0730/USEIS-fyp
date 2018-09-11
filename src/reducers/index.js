import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import registerReducer from './register-reducer';

const allReducers = combineReducers({
    auth: authReducer,
    registerReducer: registerReducer
});

export default allReducers;