const express = require('express');
const router = express.Router();

// 3. index page 열기
router.get('/', (req, res)=> {
    res.render('index.ejs');
})
module.exports = router;