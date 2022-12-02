var express = require('express');
var path = require("path");
var cookieParser = require("cookie-parser");

const passport = require ('passport');
const session = require ('session');
require ("./auth")(passport);

function authenticationMiddleware(req, res, next){
    if(req.isAuthenticated()) return next();
        res.redirect('/login');
}

const loginRouter = require ("./routes/login");
const { appendFile } = require('fs');

app.use(session({
    secret: '123',
    resave: false,
    saveUnitialized: false,
    cookie: { maxAge:60 * 60 * 1000 },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", loginRouter);
app.use("/", authenticationMiddleware, indexRouter); //rota protegida por autenticação
