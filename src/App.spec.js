import React from 'react';
import {Faq} from './components/Faq'; 
import AboutMe from './components/AboutMe';
import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import "./test/helpers"

// const mockStore = configureMockStore();
// const store = mockStore( {auth: { isAuthenticated: true }});

describe('Faq Component', () => {
    it('renders the Faq wrapper', () => {
      const wrapper = shallow(
        <Faq />);
      expect(wrapper.find('li')).to.have.length(22);
  });
});

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// const store = mockStore({
//   auth: { 
//     user: {
//       name: "www", email: "www"
//     }, 
//     isAuthenticated: true
//   }});

// describe('AboutMe Component', () => {
//   it('fetches data from server when server returns a successful response', done => { // 1
//     const mockSuccessResponse = {};
//     const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
//     const mockFetchPromise = Promise.resolve({ // 3
//       json: () => mockJsonPromise,
//     });
//     jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
    
//     const wrapper = shallow(
//       <Provider store={store}>
//     <AboutMe />
//     </Provider>).dive(); // 5
                            
//     expect(global.fetch).toHaveBeenCalledTimes(1);
//     expect(global.fetch).toHaveBeenCalledWith('https://b2auwy2dql.execute-api.ap-southeast-1.amazonaws.com/v1/society');

//     process.nextTick(() => { // 6
//       expect(wrapper.state()).toEqual({
//         // ... assert the set state
//       });

//       global.fetch.mockClear(); // 7
//       done(); // 8
//     });
//   });
// });

