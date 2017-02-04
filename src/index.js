import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import onStateChange from 'redux-on-state-change';
import {getEngineMove} from './utils/engine_connector';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(onStateChange(getEngineMove))(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
