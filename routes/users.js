const express = require('express');
const router = express.Router(); //instanciando a rota 
const Users = require('../model/user'); //importa o módulo de criação de usuários

//Para fazer uma requisição via get, ou seja, a api precisa retornar uma resposta se usa o GET
router.get('/', (req, res) => { //faz uma requisição ao json que retorna algo
    Users.find({}, (err, data)=>{
        if(err) return res.send({error: 'Error consulting users'});
        return res.send(data);
    });
});

router.post('/create', (req, res) => { //  ./users/create -> criação de usuários
   /* const obj = req.body; //objeto recebe por parâmetro campos para inserir um user na tabela
    if(!obj.email || !obj.password) return res.send({error: 'Insufficient data'});
   */

    /**
     * uma alternativa ao utilizar const obj e depois acessar as propriedades do mesmo
     * é desestruturar utilizando const { email, password} = req.body;
     * assim, o que acontece é que ao utilizar o postman enviando um email e senha, automaticamente
     * o javascript substitui pelos parametros do body sem precisar criar um objeto pra isso
     **/

     const {email, password} = req.body;
     if(!email || !password) return res.send({error: 'Insufficient data'});
     // caso tenha email e password é preciso verificar se o usuário já existe
     Users.findOne({email}, (err, data)=>{
         if(err) return res.send({ error: 'Error searchig for user'});
         if(data) return res.send({error: 'User already registred'});

         Users.create(req.body, (err,data)=>{
             if(err) return res.send({error: 'Error while creating user'});
             data.password = undefined;
             return res.send(data);
         });
     });
});

module.exports = router;