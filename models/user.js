const mongoose = require('mongoose');
const roles = require('./roles');

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  rol: { type: String, enum: Object.keys(roles), default: 'user' }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
