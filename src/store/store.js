// 'use strict';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer.js';

var createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

module.exports = createStoreWithMiddleware;