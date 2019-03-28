import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import { loginUser } from './auth-action';
import { retrieveAll } from './data-action';
import { deleteData } from './delete-action';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ACTION', () => {
    const initialState = {}
    let store

    beforeEach(() => {
        store = mockStore(initialState);
    });

    // to test whether the correct action is dispatched after respective API is called
    it('calls request and success actions if the fetch response was successful - 1', () => {
        return store.dispatch(loginUser({username: "150123", userPool: {}}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions.length).toBe(1);
            expect(expectedActions[0].type).toEqual("LOGIN_USER_SUCCESS");
          })
    });

    it('calls request and success actions if the fetch response was successful - 2', () => {
        return store.dispatch(retrieveAll("society", 37))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions.length).toBe(1);
            expect(expectedActions[0].type).toEqual("RETRIEVE_SOCIETIES");
          })
    });

    it('calls request and success actions if the fetch response was successful - 3', () => {
        return store.dispatch(deleteData("event", 10))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions.length).toBe(1);
            expect(expectedActions[0].type).toEqual("DELETE_DATA");
          })
    });
})


