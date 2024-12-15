const express = require('express');
const app = express();
const port = 3001;

app.get('/',(req, res)=>{
    res.send("Olá...Bem vindo!");    
});

app.use(express.json());
app.post('/filmes',(req, res)=>{

    const {titulo, genero} = req.body;
    res.send(`Filme:${titulo} - Gênero: ${genero}, recebido...`);

 });
const log = (req, res, next)=>{
    console.log(`................Acessado em ${new Date()}`);
    next();
}

app.get('/transfere', log,(req, res)=>{
    res.send("Sucesso! Valor transferido...");
})


const livros = require('./livros');

app.use('/livros', livros)  

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});
