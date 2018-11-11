import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Main from './components/Main';
import AuthStore from "./stores/AuthStore";
import BookStore from "./stores/BookStore";
import RequestStore from "./stores/RequestStore";

const stores = {
    authStore: new AuthStore(),
    bookStore: new BookStore(),
    requestStore:new RequestStore()
    // userStore: new UserStore(),
    // recordStore: new RecordStore()
};

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter basename="/torrbook">
            <Main/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

