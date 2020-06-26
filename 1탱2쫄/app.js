const express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var compression = require('compression');
var helmet = require('helmet');
var Routes = require('./routes/index.js'); 



app.set('views', __dirname + '/views'); // 서버가 HTML 렌더링을 할 때, EJS엔진을 사용하도록 설정합니다. 
app.engine('html', require('ejs').renderFile); 

app.use(compression());
app.use(helmet());
 


var server = app.listen(3000, function(){ 
});
app.use('/', Routes);



app.use(function(req, res, next) {
  res.status(404).send('잘못된 접근입니다');
});

 app.use(function (err, req, res, next) {
   console.error(err.stack)
   res.status(500).send('없는 페이지 입니다')
 })








 module.exports =app;