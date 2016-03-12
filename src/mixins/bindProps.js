/*
 * 抽象出每个container所需要的select和mapDispatchToProps
 */

import {bindActionCreators} from 'redux';
import Actions from '../action/actions.js';

const select = (state) => ({
  indexData: state.indexData
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

module.exports = {
  select,
  mapDispatchToProps
};
