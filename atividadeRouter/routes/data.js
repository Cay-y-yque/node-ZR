const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('data', { ttitle: 'DATA' });
})

router.post('/', (req, res, next) => {
    res.send("This is a so awesome site");
})

module.exports = router;