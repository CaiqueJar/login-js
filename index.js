const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const path = require("path");

const bodyParser = require("body-parser");
const Post = require("./models/Post");


app.engine("handlebars", engine({defaultLayout: "main"}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname+"/public")));

app.get("/", function(req, res) {
    res.render("principal", {style: "home.css"});
})

app.get("/cadastro", function(req, res) {
    res.render("form-cadastro", {style:"style.css"});
})

app.post("/certo", function(req, res) {
    Post.create({
        nome: req.body.nome,
        idade: req.body.idade,
        email: req.body.email,
        senha: req.body.senha
    }).then(function() {
        res.send("deu certo");
    }).catch(function(erro){
        res.send("Houve um erro: "+erro);
    })
})


app.get("/login", function(req, res) {
    
    res.render("form-login", {title:"Login", style:"login.css"});
})

app.post("/bem-vindo", function(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;
    
    Post.findAll({where: {email: email, senha: senha}}).then(function(user) {
        if(JSON.stringify(user) == "[]") {
            res.redirect("/deu-ruim");

        }
        else {
            res.send("<h1>Login realizado com sucesso</h1>")
        }
    });
})

app.get("/deu-ruim", function(req, res) {
    res.send("Deu ruim o seu login :(");
})

app.listen(8080, function(){
    console.log("Funcionou");
})