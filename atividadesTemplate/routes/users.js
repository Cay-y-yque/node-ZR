var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("<h1>Usuários! Essa é a página.</h1>");
});

module.exports = router;
