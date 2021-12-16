const express = require('express');

const app = express();
const { validator } = require('express-fastest-validator');

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended:false}));

const course = require("./controllers/course.controller");
const sign = require('./controllers/signup.controller');
const login = require('./controllers/login.controller');
const desc = require('./controllers/desc.controller');



app.use("/udemy",course);
app.use('/signup',sign);
app.use('/login',login);
app.use('/desc',desc);



module.exports = app;