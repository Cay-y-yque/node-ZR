const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    res.send("My bedroom.");
});

module.exports = router;