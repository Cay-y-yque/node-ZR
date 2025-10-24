const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Essa é a página do about</h1>")
})

module.exports = router;