var express = require('express');
var router = express.Router();
var alert = require('alert-node');
const mysql = require('mysql')

//get homepage
router.get('/', function(req,res){ // 3
    session = req.session;
    res.render('signin', {
      session : session
    });
  });

router.post('/join', function(req,res){
//create db connection
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

    var body = req.body;
    var email = body.email;
    var id = body.uid;
    var name = body.uname;
    var passwd = body.psw;
    var passwd_rep = body.psw_repeat;
    var address = body.address

    connection.query("SELECT *FROM user WHERE ID=?",[id],function(err,data) {
        if(data.length == 0) {
          if(passwd !== passwd_rep) {
            alert("Password and Password-repeat deos not match");
          }
          else{
          console.log(passwd);
          var query = connection.query('insert into user (id,email, password, uname,address) values ("' + id + '","' + email + '","' + passwd + '","' + name +'","'+address+ '")', function(err, rows) {
              if(err) { throw err;}
              console.log("Data inserted!");
              res.render('home')
          })
        }
        }
        else {
          alert("ID already exists");
        }
    })


})

module.exports = router;


