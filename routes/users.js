const express = require("express");
const router = express.Router(); //instanciando a rota
const Users = require("../model/user"); //importa o módulo de criação de usuários
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//funções auxiliares
const createUserToken = (userId) =>{
    return jwt.sign({id: userId}, 'akira' , {expiresIn: '7d'});
}

//Para fazer uma requisição via get, ou seja, a api precisa retornar uma resposta se usa o GET
router.get("/", async (req, res) => {
  //faz uma requisição ao json que retorna algo
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: "Error while consulting users" });
  }
});

router.post("/create", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return rres.status(400).send({ error: "Insufficient data" });
  // caso tenha email e password é preciso verificar se o usuário já existe
  try {
    if (await Users.findOne({ email }))
      return res.status(500).send({ error: "User already registred" });

    const user = await Users.create(req.body);
    user.password = undefined;

    return res.status(201).send({user,token:createUserToken(user.id)});
  } catch (err) {
    return res.status(500).send({ error: "Error searchig for user" });
  }
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send({ error: "Insuficient Data!" });

  try {
    const user = await Users.findOne({ email }).select('+password');
    if (!user) return res.status(400).send({ error: "User not registred!" });

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) return res.status(401).send({ error: "Error while authenticate user!" });
    user.password = undefined;

    return res.send({user, token: createUserToken(user.id)});
  } catch (err) {
    return res.status(500).send({ error: "Error searchig for user" });
  }
});

module.exports = router;


/**
 * tipos de status:
 * 200 - OK
 * 201 - Created
 * 202 - Accepted
 * 400 - Bad Request
 * 401 - Unathourized -> Autenticação, status temporário
 * 403 - Forbidden -> Autorização, status permanente
 * 404 - Not Found
 * 500 - Internal Server Error
 * 501 - Not Implemented - API não suporta essa funcionalidade
 * 503 - Service Unavailable- a API executa operação, mas está indisponível
 */