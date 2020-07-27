var express = require('express');
var app = express();
var router = express.Router()
var bodyParser = require('body-parser');
var cors = require('cors')
const mysql = require('mysql');


//db
const connection= mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'gmdrb918@@',
  database : 'survey'
});

//connect
connection.connect((error)=> {
  if(error) {
    throw error;
    console.log("디ㅣㅂ연결실패");
  }
  console.log("디비 연결 완료");
});

//router
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var createSurveyRouter = require('./routes/createsurvey');
var myPageRouter = require('./routes/mypage');
var signInRouter = require('./routes/signin');
var surveyDetailRouter = require('./routes/surveydetail');
var surveyListRouter = require('./routes/surveylist');
var logoutRouter = require('./routes/logout');
var createSurveyDetailRouter = require('./routes/create_survey_detail');

//app.use(cookieParser());
// cors
const corsOptions = {
  origin: true,
  credentials: true
}

app.set('view engine','ejs'); // 1

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(express.json());


const session = require('express-session');
app.use(session({
  key: 'sid',
  secret : 'secret',
  resave : false,
  saveUninitialized : true,
  cookie : {
    maxAge : 24000*60*60
  }
}));
 
loginRouter.use(bodyParser.json());
signInRouter.use(bodyParser.json());
createSurveyDetailRouter.use(bodyParser.json())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})





app.use('/',indexRouter);
app.use('/mypage',myPageRouter);
app.use('/surveylist',surveyListRouter);
app.use('/surveylist/:nameParam',surveyDetailRouter);
app.use('/create_survey',createSurveyRouter);
app.use('/signin',signInRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/create_survey_detail',createSurveyDetailRouter);


var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});