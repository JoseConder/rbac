const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function create(req, res, next) {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const rol = req.body.rol || 'user';
  let salt = await bcrypt.genSalt(10);
  console.log(req.body);
  const passwordHash = await bcrypt.hash(password, salt);

  let user = new User({
    name: name,
    lastName: lastName,
    email: email,
    password: passwordHash,
    salt: salt,
    rol:rol
  });
  console.log(user);
  user.save().then(obj => res.status(200).json({
    message: "Usuario creado correctamente",
    obj: obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo almacenar el usuario",
    obj: ex
  }));
}

function list(req, res, next) {
    User.find().then(objs => res.status(200).json({
      message: "Lista de usuarios",
      obj: objs
    })).catch(ex => res.status(500).json({
      message: "No se pudo consultar la lista de usuarios",
      obj: ex
    }));
  }

  function destroy(req, res, next) {
    const id = req.params.id;
    User.findByIdAndDelete(id).then(obj => res.status(200).json({
      message: "Usuario eliminado correctamente",
      obj: obj
    })).catch(ex => res.status(500).json({
      message: "No se pudo eliminar el usuario",
      obj: ex
    }));
  }

module.exports = {
  create,
  list,
  destroy
}