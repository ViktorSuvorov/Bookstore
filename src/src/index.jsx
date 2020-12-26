import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import store from './Redux/store';

ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
