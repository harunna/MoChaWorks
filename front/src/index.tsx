import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createStore from './store';
import App from './components';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));