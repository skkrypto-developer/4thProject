var express = require('express');
var router = express.Router();

/* GET home page. */
//index
router.get('/', function(req, res, next) {
  res.render('index.html');
});


// 학회소개
router.get('/about', (req,res,next)=>{
  res.render('about.html')
})

router.get('/FAQ', (req,res,next)=>{
  res.render('FAQ.html')
})

router.get('/blog', (req,res,next)=>{
  res.render('blog.html')
})

router.get('/service', (req,res,next)=>{
  res.render('service.html')
})

router.get('/admin', (req,res,next)=>{
  res.render('admin.html')
})

router.get('/certification', (req,res,next)=>{
  res.render('certification.html')
})
module.exports = router;
