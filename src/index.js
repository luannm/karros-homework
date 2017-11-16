import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configureStore';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import YelpApi from './models/YelpApi';

require('dotenv').config();

const target = document.querySelector('#root');
YelpApi.getAccessToken();

/**
 * TODO:
 * - Finish search function + search box (DONE)
 * - Implement pagination (DONE)
 * - Implement layout for sub filters
 * - Refactor code + Implement unit test
 */

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  target
);
registerServiceWorker();
