var express = require('express');
var router = express.Router();

const mysql = require('mysql');

//get homepage
router.get('/', function(req,res){ // 3
    let session = req.session;
    res.render('create_survey_detail', {
      session: session
    });
  });


router.post('/create', function(req,res){ // 3
  let session = req.session;
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

  //console.log(req.creator.text);
  console.log("바디 찍혔으면 좋겠다.")
  console.log(req.body);

  var target = JSON.stringify(req.body);

  var t_prev = JSON.stringify(req.body);
  var t_prprev = JSON.parse(t_prev);

  var t = t_prprev["pages"][0]["title"];
  console.log(t);


  var query = connection.query('insert into survey_list (title,text, userid) values ("' +t + '",' + "'"+ target +"'"+',"'  + session.uid + '")', function(err, rows) {
    if(err) { throw err;}
    console.log("Data inserted!");
})

res.redirect('http://localhost:3000/');

});

module.exports = router;






