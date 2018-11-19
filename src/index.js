import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// front-end design 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'font-awesome/css/font-awesome.min.css';

// initialize firebase
import { initializeFirebase } from './push-notification';

// initialize redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
);

initializeFirebase();  
