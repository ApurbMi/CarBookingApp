const userMethods = require('../Controllers/user.controller');
const route = require('express').Router();


route.post('/reg',userMethods.singIn);
route.get('/alluser',userMethods.getAllUser);
route.post('/login',userMethods.logIn);

module.exports = route;