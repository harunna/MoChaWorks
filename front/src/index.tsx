import React from 'react';
import { ThemeProvider } from '@emotion/react'
import { ThemeProvider as MUIThemeProvider}  from '@mui/material';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createStore from './store';
import App from './components';
import theme from './styles';
import './index.css';
import { createTheme } from '@mui/material';

const store = createStore();

const muiTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Nunito, sans-serif'
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MUIThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MUIThemeProvider>
  </Provider>
, document.getElementById('root'));