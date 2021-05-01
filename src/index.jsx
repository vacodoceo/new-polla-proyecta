import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import dotenv from 'dotenv';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

dotenv.config();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33ccff',
      light: '#5bd6ff',
      dark: '#238eb2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      paper: '#fafafa',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
