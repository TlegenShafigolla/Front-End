import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './services/serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./redux/store";


ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
</BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
