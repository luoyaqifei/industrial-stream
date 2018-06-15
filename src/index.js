// Set up your application entry point here...
import React from 'react';
import { render } from 'react-dom';
import configureStore from "./store/configureStore";
import { AppContainer } from "react-hot-loader";
import Root from "./components/Root";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";
import "../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss";
import "./styles/styles.scss";
import 'babel-polyfill';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);
