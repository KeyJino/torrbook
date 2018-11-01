import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Main from './components/Main';
import AuthStore from "./stores/AuthStore";

const stores = {
    authStore: new AuthStore()
};

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter basename="/JetSpace">
            <Main/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

