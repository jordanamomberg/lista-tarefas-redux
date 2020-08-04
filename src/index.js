import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import store from './Store/StoreConfig'
import { createStore } from 'redux';
import reducers from './Store/reducers/todos';

const rootElement = document.getElementById('root');
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()

const StoreConfig = createStore(reducers, devTools);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)