const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
    res.send("Isso é pra ser o signup");
})

module.exports = router;