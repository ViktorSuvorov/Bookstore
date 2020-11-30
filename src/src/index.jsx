import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import appStore from './Redux/store';
import { ADD_BOOK } from './Redux/constants';

const store = appStore();
setTimeout(
  () => {
    store.dispatch({
      type: ADD_BOOK,
    });
  }, 1000,
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
