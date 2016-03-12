import ActionTypes from '../constants/ActionTypes.js';
import stateDefault from '../state';
import config from '../common/config.js';

function indexData(state, action) {
  if (!state) {
    state = stateDefault.indexData;
  }

  switch (action.type) {
  case ActionTypes.CHANGE_TITLE:
    return Object.assign({}, state, {
      title: action.title,
    });
  default:
    return state
  }
}

module.exports = indexData;