var express = require('express');
var router = express.Router();
const shortid = require('shortid');
let jwt = require('jsonwebtoken');
var sha256 = require('js-sha256');
const Users = require('../mongo/users');

router.get('/', function(req, res, next){
  res.json(users);
});

/* GET users listing. */
router.post('/', function(req, res, next){
  res.json(messages);
});

router.post('/login', function(req, res, next) {
})

var checkRegUser = function(email, password, jwt) {
  if (!email || !password) {
    throw new Error("Forgot email or password")
  }
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var match = re.test(email)
  if (!match) {
    throw new Error("Invalid email")
  }
  if (password.length < 8) {
    throw new Error("Password is too short")
  }
  var hash = sha256.create();
  for (var x = 0; x < users.length; x++) {
    if (users[x]["email"] == email) {
      throw new Error("Email is taken")
    }
  }
  hash.update(password);
  hash = hash.hex();
  var userJson = {
    "email": email,
    "sha256": hash,
    "JWTToken": "",
    "JWTExpiry": "",
    "FavoriteTeam": "",
    "AccountCreated": new Date().toLocaleDateString()
  }
  return userJson;
}

router.post('/register', function(req, res, next) {
  Users.getUsers().then(success => {
    users = success
    checkRegUser(req.body.email, req.body.password, req.body.jwt).then(successUser => {
      Users.insertUser(successUser).then(success => {
        res.json(successUser);
      }).catch(err => {
        throw new Error(err);
      })
    }).catch(err => {
      throw new Error(err);
    })
  }).catch(err => {
    next(err);
  })
})

module.exports = router;
