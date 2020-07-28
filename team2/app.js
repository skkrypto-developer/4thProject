const express = require('express');
const path = require('path');
const port = 3000;
const indexRouter = require('./routes/');
const mainRouter = require('./routes/main');
const cors = require('cors');
const app = express();
const Web3 = require('web3');
// console 시간 찍히게
require('console-stamp')(console, 'yyyy/mm/dd HH:MM:ss.l');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body-parser 대응
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// cors
const corsOptions = {
  origin: true,
  credentials: true
}
app.use(cors(corsOptions));

// 1. 라우팅으로 indexRouter, walletRouter 사용할 것
app.use('/', indexRouter);
app.use('/main', mainRouter);
// 2. 서버 열기

app.listen(3000);

module.exports = app;
