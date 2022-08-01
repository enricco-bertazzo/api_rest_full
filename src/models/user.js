const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true, //converter para caixa baixa
  },

  password: {
    type: String,
    required: true,
    select: false, //em momentos de consulta de user está informação não é puxada
  },

  createdAt: {
    //data de criação do usuario
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
}); //encriptação da senha do usuario

const User = mongoose.model("User", UserSchema);

module.exports = User;
