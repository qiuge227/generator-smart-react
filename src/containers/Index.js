import React from 'react';
import {connect} from 'react-redux';
import * as config from 'common/config.js';
import bindProps from 'mixins/bindProps.js';
import Actions from 'action/actions.js';

const Index = React.createClass({

  handleInputChange: function (name) {
    var that = this;
    return function (event) {
    	if(name === 'title'){
    		that.props.actions.changeTitle(event.target.value);
    	}
    }
  },

  render: function () {
    return (
      <div>
        {this.props.indexData.title}
        <br/>
        <input type='text' name='title' onChange={this.handleInputChange('title')} value={this.props.indexData.title}/>
      </div>
    )
  }

});

module.exports = connect(bindProps.select, bindProps.mapDispatchToProps)(Index);
