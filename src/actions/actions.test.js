import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { loginUserSuccessful } from './auth-action';
import { searchDataSuccessful } from './data-action';
import { deleteDataSuccessful } from './delete-action';
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
})


