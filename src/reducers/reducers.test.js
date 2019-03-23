import authReducer from './auth-reducer';
import createReducer from './create-reducer';
import dataReducer from './data-reducer';
import deleteReducer from './delete-reducer';

const initialState = {
    userName: ''
};
const loggedInState = {
    userName: '123',
    createLoading: false,
    societyName: "First Aid",
    societyCategory: "Health",
    deleteLoading: true
};

describe('REDUCER', () => {
    it('handles successful login', () => {
        expect(authReducer(initialState, {
            type: "LOGIN_USER_SUCCESS",
            payload: { userName: '123' },
        }).userName).toEqual(loggedInState.userName);
    });

    it('handles successful create', () => {
        expect(createReducer(initialState, {
            type: "CREATE",
            payload: { loading: false },
        }).loading).toEqual(loggedInState.createLoading);
    });

    it('handles successful retrieve', () => {
        expect(dataReducer(initialState, {
            type: "RETRIEVE_ONE_SOCIETY",
            payload: { "society" : { name: "First Aid", category: "Health" }} ,
        }).society.name).toEqual(loggedInState.societyName);

        expect(dataReducer(initialState, {
            type: "RETRIEVE_ONE_SOCIETY",
            payload: { "society" : { name: "First Aid", category: "Health" }} ,
        }).society.category).toEqual(loggedInState.societyCategory);
    });

    it('handles successful deleted', () => {
        expect(deleteReducer(initialState, {
            type: "DELETE_PARTICIPATION",
            payload: { "loading" : true} ,
        }).loading).toEqual(loggedInState.deleteLoading);
    });
})