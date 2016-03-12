// 引用
import React from 'react';
let Router = require('react-router').Router;
let Route = require('react-router').Route;
let Redirect = require('react-router').Redirect;

// 容器
import Index from './containers/Index';
var enterIndex = function(){
  console.log('您当前已经进入首页');
}

module.exports = (function (history) {
 return (
    <Router localtion="history" history={history}>
      <Route path='/' component={Index} onEnter={enterIndex}/>
      <Redirect from="*" to="/" />
    </Router>
    )
});
