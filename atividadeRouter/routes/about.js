var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Esse é um site muito legal sobre o express.");
})
// Esse roteador vai ser utilizado pelo app. O roteador vai responder a requisição get na página about
// de acordo com o app.js

module.exports = router;