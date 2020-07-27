var express = require('express');
var router = express.Router();

//get homepage

router.get('/', function(req,res){ // 3
    let session = req.session;
    res.render('surveylist', {
      session : session
    });
  });
  
module.exports = router;
