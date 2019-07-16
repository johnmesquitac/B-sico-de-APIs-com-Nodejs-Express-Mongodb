const express = require("express");
const router = express.Router(); //instanciando a rota
const Users = require("../model/user"); //importa o módulo de criação de usuários
const bcrypt = require("bcrypt");

//Para fazer uma requisição via get, ou seja, a api precisa retornar uma resposta se usa o GET
router.get("/", async (req, res) => {
  //faz uma requisição ao json que retorna algo
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.send({ error: "Error while consulting users" });
  }
});

router.post("/create", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ error: "Insufficient data" });
  // caso tenha email e password é preciso verificar se o usuário já existe
  try {
    if (await Users.findOne({ email }))
      return res.send({ error: "User already registred" });

    const user = await Users.create(req.body);
    user.password = undefined;
    return res.send(user);
  } catch (err) {
    return res.send({ error: "Error searchig for user" });
  }
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send({ error: "Insuficient Data!" });

  try {
    const user = await Users.findOne({ email }).select('+password');
    if (!user) return res.send({ error: "User not registred!" });

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) return res.send({ error: "Error while authenticate user!" });
    user.password = undefined;
    return res.send(user);
  } catch (err) {
    return res.send({ error: "Error searchig for user" });
  }
});

module.exports = router;
