const express = require('express');
const router  = express.Router();

router.get('/signin', (req, res, next) => {
    res.send("Isso é pra ser o signin");
})

router.get('/users/:id', (req, res, next) => {
    const id = req.params.id;
    if(!parseInt(id)){
        res.redirect('/signup');
    }
    else{
        res.send(`Você é o usuário de id ${id}`);
    }
})

module.exports = router;