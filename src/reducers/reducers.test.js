import authReducer from './auth-reducer';

const initialState = {
    userName: ''
};
const loggedInState = {
    userName: '123'
};

it('handles successful login', () => {
    expect(authReducer(initialState, {
        type: "LOGIN_USER_SUCCESS",
        payload: { userName: '123' },
    }).userName).toEqual(loggedInState.userName);
});
