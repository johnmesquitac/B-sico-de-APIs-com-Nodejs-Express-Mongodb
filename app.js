const express = require('express'); //criar api, express framework de acesso web
const app = express(); //instancia express

//para fazer uma requisição via get, ou seja, a api precisa retornar uma resposta se usa o GET
app.get('/', (req, res) => { //faz uma requisição ao json que retorna algo
    let obj = req.query; //o objeto pega da requisição a query enviada
    return res.send({ message: `Get:${obj.nome},${obj.idade}` }); //devolução de um json com propriedade message
}); //criação de um endpoint simples 

//para fazer requisição de POST, usa o campo body do postman
app.post('/', (req, res) => {
    return res.send({ message: 'ok, post' });
});
 // quando postamos algo, o node precisa transformar o que ta sendo enviado em um objeto, utilizando a biblioteca bodyparser
app.listen(3000); // a api precisa ser escutada em alguma porta

module.exports = app; //define o que está sendo escutado no app.listen
