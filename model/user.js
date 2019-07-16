const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
//criando um schema, ou seja, uma tabela de usuários
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created: { type: Date, default: Date.now }
});

/* modulo presave faz com que a senha do usuário seja criptografada ao armazenar no banco*/

UserSchema.pre("save", async function(next) {
  let user = this;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 10);
  return next();
});
module.exports = mongoose.model("User", UserSchema);
