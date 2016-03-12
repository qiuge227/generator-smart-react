var express = require('express');
var Config = require('./config');
var fs = require('fs');
var ejs = require('ejs');

var app = express();
app.set('views', __dirname + '/../../public');
app.use(express.static(__dirname + '/../../public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


// 启动服务器
app.get('*', function (req, res) {
  res.render('app.html', {});
});

app.listen(Config.port);
console.log("index frontend starting on port: %d", Config.port);