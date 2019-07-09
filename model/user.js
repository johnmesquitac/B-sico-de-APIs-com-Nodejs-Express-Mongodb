const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//criando um schema, ou seja, uma tabela de usuários
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: { type: Date, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema);