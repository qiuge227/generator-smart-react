import React from 'react';
import {render} from 'react-dom';
let rootReducer = require('./reducers/rootReducer');
import {Provider} from 'react-redux';
let createStore = require('./store/store');

// 为服务端提供的全局变量
let config = require('./common/config.js');
window.store = createStore(rootReducer, window.__INIT_STATE__);

let history = require('history').createHistory();
let router = require('./router')(history);

// let 和 var是否是一样的东西
// let DevTools = require('containers/DevTools.js').default;

render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('root')
);
