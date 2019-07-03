const express = require('express'); //criar api, express framework de acesso web
const app = express(); //instancia express

const indexRoute = require('./routes/index'); //definindo rota index
const usersRoute = require('./routes/users'); //definindo rota users que recebe dados

app.use('/', indexRoute);
app.use('/users', usersRoute);


app.listen(3000); // a api precisa ser escutada em alguma porta

module.exports = app; //define o que está sendo escutado no app.listen
