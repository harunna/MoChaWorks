import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';
import createStore from './store';
import { ThemeProvider } from 'styled-components';
import App from './components';
import theme from './styles';
import './index.css';

const store = createStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </Provider>
  </ThemeProvider>
, document.getElementById('root'));