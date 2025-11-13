const express = require('express');
const log = require('./log'); 
const app = express();
const port = 3000;
const path = require('path');

app.listen(port, () => {
    console.log(`Escutando na porta ${port}`);
});

app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'ejs');

app.get('/v1/hi', (req, res) => {
    const date_ = new Date().toString();
    
    var msg = {
        msg: "Olá, Oi, Eai",
        date: date_,
    }
    res.status(200);
    res.render("form", {
        title: "Formulário de Teste Api",
        name: "Seu nome:",
        email: "Seu email:",
        placeholderName: "Digite seu nome",
        placeholderEmail: "Digite seu email",
        submit: "Enviar",
        route: '/v1/hi'
    })
    
    msg = JSON.stringify(msg);
    log(date_, '/v1/hi', msg);
})

app.get('/v2/hi/:language', (req, res) => {
    const date_ = new Date().toString();
    const language = req.params.language;
    var msg;
    const route = `/v2/hi/${language}`;

    if (language == "pt-br"){
        res.render("form", {
            title: "Formulário de Teste Api",
            name: "Seu nome:",
            email: "Seu email:",
            placeholderName: "Digite seu nome",
            placeholderEmail: "Digite seu email",
            submit: "Enviar",
            route: route,
        })
        msg = "Olá mundo";
    }
    else if (language == "es"){
        res.render("form", {
            title: "Formulario de prueba API",
            name: "Su nombre:",
            email: "Tu correo electrónico:",
            placeholderName: "Introduce tu nombre",
            placeholderEmail: "Introduce tu correo electrónico",
            submit: "Entregar",
            route: route,
        })
        msg = "Hola Mundo"
    }
    else if (language == "en"){
        res.render("form", {
            title: "Api test form",
            name: "Your name:",
            email: "Your email:",
            placeholderName: "Type your name",
            placeholderEmail: "Type your email",
            submit: "Submit",
            route: route,
        })
        msg = "Hello world";
    }
    else{
        return res.status(404).json({error: "Rota desconhecida."});
    }
    var out = {
        msg: msg,
        date: date_,
        language: language,
    }

    log(date_, `v2/hi/${language}`, msg);

})

app.post('/v2/hi/:language', (req, res) => {
    const date_ = new Date().toString();
    const { name, email} = req.body;

    if (!name || !email){
        return res.status(404).json({error: "Faltou Preencher algum dos membros."});
    }

    var prefName;
    var prefEmail;
    const lang = req.params.language;
    if (lang  == 'pt-br'){
        prefName = "Seu nome";
        prefEmail = "Seu email";
    }
    else if (lang == 'es'){
        prefName = "Su nombre"
        prefEmail = "Tu correo electrónico"
    }
    else if (lang == 'en'){
        prefName = "Your name"
        prefEmail = "Your email"
    }

    const out = {
        msgName: `${prefName}: ${name}`,
        msgEmail: `${prefEmail}: ${email},`
    };

    res.status(200).json(out);
})

app.get('/v1/hi/user/:name', (req, res) => {
    const date_ = new Date().toString();
    const out = {
        msg: `Você é o usuário de nome ${req.params.name}`,
    }

    res.status(202).json(out);
    log(date_, `/v1/hi/user/${req.params.name}`, JSON.stringify(out));
})

app.post('/v1/hi', (req, res) => {
    const date_ = new Date().toString();
    const { name } = req.body;
    if (!name){
        return res.status(404).json({error: "Name is required."});
    }

    const out = {
        msg: `Requisição POST realizada, ${name.toUpperCase()}`,
    }

    res.status(200).json(out);
    log(date_, '/v1/hi', JSON.stringify(out));

})

app.get('*splat', (req, res) => {
    const date_ = new Date().toString();
    const out = {
        msg: "Endpoint não encontrado!",
    }
    res.status(404).json(out);
    log(date_, '*splat', JSON.stringify(out));
})