import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux';
import { FbProvider } from './firebase';

import App from './App';
import 'antd/dist/antd.css';
import './assets/styles.sass';

ReactDOM.render(
  <FbProvider>
    <Provider store={ store }>
      <App />
    </Provider>
  </FbProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
