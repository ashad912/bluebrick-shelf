import React from 'react';
import ReactDOM from 'react-dom';


import 'typeface-roboto'
import './index.css';
import App from './App';
import ReduxRoot from 'ReduxRoot'
import * as serviceWorker from './serviceWorker';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#0080c0',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#333333',
    },
    background: {
      default: '#0080c0'
    },
    text: {
      primary: '#333333'
    }
  },
});

ReactDOM.render(
  <ReduxRoot>
    <React.StrictMode>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </ReduxRoot>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
