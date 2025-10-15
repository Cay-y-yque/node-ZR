const express = require('express');
const router  = express.Router();

router.get('/signin', (req, res, next) => {
    res.render('signin');
    res.send("Isso é pra ser o signin");
})

router.get('/users/:id', (req, res, next) => {
    const id = req.params.id;
    if(!parseInt(id)){
        res.redirect('/signup');
    }
    else{
        res.render('users', {tipoDeUsuario: `o usuário de id ${parseInt(id)}`});
    }
})

module.exports = router;