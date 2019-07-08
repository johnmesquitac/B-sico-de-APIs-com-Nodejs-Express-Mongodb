const express = require('express'); //criar api, express framework de acesso web
const app = express(); //instancia express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb+srv://AKIRAuser_admin:password@akiracluster-bvd0r.mongodb.net/test?retryWrites=true&w=majority'
const options = { reconnectTries:Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err)=>{
    console.log('Conexion Error:'+ err);
})

mongoose.connection.on('disconnected', ()=>{
    console.log('Application Disconnected:');
})

mongoose.connection.on('connected', () =>{
    console.log('Application Connected');
})

// Body Parser - parseador pois quando se envia uma requisição do body do post
//para o código entender essa requisição como um objeto JSON precisar utilizar o bodyparser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



const indexRoute = require('./routes/index'); //definindo rota index
const usersRoute = require('./routes/users'); //definindo rota users que recebe dados

app.use('/', indexRoute);
app.use('/users', usersRoute);


app.listen(3000); // a api precisa ser escutada em alguma porta
module.exports = app; //define o que está sendo escutado no app.listen
