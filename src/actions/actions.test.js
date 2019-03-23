import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import { loginUserSuccessful, loginUser } from './auth-action';
import { searchDataSuccessful, exportData } from './data-action';
import { deleteDataSuccessful, deleteData } from './delete-action';
import { createSuccessfully } from './post-action';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ACTION', () => {
    const initialState = {}
    let store

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('should dispatch "loginSuccessful" action', () => {
        // Dispatch the action
        store.dispatch(loginUserSuccessful())

        // Test if the store dispatched the expected actions
        expect(store.getActions()[0].type).toEqual("LOGIN_USER_SUCCESS")
    })

    it('should dispatch "searchDataSuccessful" action', () => {
        store.dispatch(searchDataSuccessful("society"))
        expect(store.getActions()[0].type).toEqual("SEARCH_SOCIETY")
    })

    it('should dispatch "deleteDataSuccessful" action', () => {
        store.dispatch(deleteDataSuccessful())
        expect(store.getActions()[0].type).toEqual("DELETE_DATA")
    })

    it('should dispatch "createSuccessfully" action', () => {
        store.dispatch(createSuccessfully())
        expect(store.getActions()[0].type).toEqual("CREATE")
    })

    // to test whether the correct action is dispatched after respective API call
    it('calls request and success actions if the fetch response was successful - 1', () => {
        return store.dispatch(loginUser({username: "123", userPool: {}}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions.length).toBe(1);
            expect(expectedActions[0].type).toEqual("LOGIN_USER_SUCCESS");
          })
    });

    it('calls request and success actions if the fetch response was successful - 2', () => {
        return store.dispatch(exportData("eventCrew", 4))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions.length).toBe(1);
            expect(expectedActions[0].type).toEqual("EXPORT_DATA");
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


