var express = require('express');
var router = express.Router();
const mysql = require('mysql')


//get homepage

router.get('/', function(req,res){ // 2
    let session = req.session;
    var results = [];
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

    connection.query("SELECT title FROM survey_list WHERE userid =?",[session.uid],function(err,data) {
      for(var i = 0; i<data.length; i++) {
        results.push(data[i]['title']);
        console.log(results[i]);
      }
      if(err) throw err;
      res.render('mypage', {
        session : session,
        results : results
      });
    });
  })

module.exports = router;
