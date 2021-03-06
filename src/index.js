import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import factory from "./views/ArtTest/helpers/persist/configureStore";

const { store, persistor } = factory();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={<></>} persistor={persistor} >
            <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//6011346590d50e99ab9b0b42
serviceWorker.unregister();
