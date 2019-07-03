const express = require('express');
const router = express.Router(); //instanciando a rota 

//Para fazer uma requisição via get, ou seja, a api precisa retornar uma resposta se usa o GET
router.get('/', (req, res) => { //faz uma requisição ao json que retorna algo
    return res.send({ message: 'GET: users welcome' });//devolução de um json com propriedade message
});

//POST utiliza o campo body do Postman
router.post('/', (req, res) => {
    return res.send({ message: 'POST: users welcome' });
});

router.post('/create', (req, res) => { //  ./users/create
    return res.send({ message: 'User has been created' });
});

module.exports = router;