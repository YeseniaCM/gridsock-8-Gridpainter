const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
<<<<<<< HEAD
const connection = require('./lib/conn.js');
const cors = require('cors');
=======
const connection = require('./lib/conn.js'); 
require('dotenv').config()

>>>>>>> cb9503a4689a3ecfa77ecc09dc7d15d6b14a8ded


connection.connect(function(err){
    if(err) throw err
    else console.log(`Connected to database ${process.env.DB_NAME}`);
  })

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
