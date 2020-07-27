var express = require('express');
var router = express.Router();

//get homepage

router.all('/',function(req,res) {
    let session = req.session;
    res.render('home',{
        session : session
    });
})

module.exports = router;
