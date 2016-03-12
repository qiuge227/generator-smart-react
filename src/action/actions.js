import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import {actionCreator, optionsActionCreator} from 'redux-action-utils';
import types from '../constants/ActionTypes.js';
import config from '../common/config.js';

// 添加用户信息
exports.changeTitle = (title) => ({
  type: types.CHANGE_TITLE,
  title: title
});
