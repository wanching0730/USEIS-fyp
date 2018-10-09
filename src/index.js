import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'font-awesome/css/font-awesome.min.css';

// initialize firebase
import { initializeFirebase, initializePush } from './push-notification';

//import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import allReducers from './reducers';
import configureStore from './store/configureStore';

// const store = createStore(
//     allReducers, 
//     window.devToolsExtension && window.devToolsExtension()
// );

const store = configureStore();

console.log("State in store: " + JSON.stringify(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
);

initializeFirebase();  
setTimeout(initializePush, 3000);
//registerServiceWorker();
