const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
const key = 'c7f6663f925ce99625563a31b3d33adb';
const app = express();


// Configuración del middleware de autenticación
const {expressjwt: auth} = require('express-jwt');

/*app.use(auth({
  secret: key,algorithms:['HS256']}).unless({path:['/login', '/home']}));*/

// Importación de las rutas
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');

// Configuración de la base de datos
const url = 'mongodb+srv://a299506:mondongo@cluster0.orzxcsb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url);
const db = mongoose.connection;

db.on('error',()=>{
    console.log("No se ha podido conectar a la base de datos");
});
db.on('open',()=>{
    console.log("Se ha conectado correctamente");
});
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Registro de las rutas
app.use('/', loginRouter);
app.use('/users', usersRouter);

// Configuración del servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT || 3000}`);
});

module.exports = app;
