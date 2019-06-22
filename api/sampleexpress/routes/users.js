var express = require('express');
var router = express.Router();
const shortid = require('shortid');
let jwt = require('jsonwebtoken');
var sha256 = require('js-sha256');

var users = []

router.get('/', function(req, res, next){
  res.json(users);
});

/* GET users listing. */
router.post('/', function(req, res, next){
  res.json(messages);
});

router.post('/login', function(req, res, next) {
  console.log('very nice');
})

router.post('/register', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    throw new Error("Forgot email or password")
  }
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var match = re.test(req.body.email)
  if (!match) {
    throw new Error("Invalid email")
  }
  var email = req.body.email
  var password = req.body.password
  if (password.length < 8) {
    throw new Error("Password is too short")
  }
  var hash = sha256.create();
  for (var x = 0; x < users.length; x++) {
    if (users[x]["email"] == req.body.email) {
      throw new Error("Email is taken")
    }
  }
  hash.update(password);
  hash = hash.hex();
  var userJson = {
    "email": req.body.email,
    "sha256": hash,
    "JWTToken": "",
    "JWTExpiry": "",
    "FavoriteTeam": "",
    "AccountCreated": new Date().toLocaleDateString()
  }
  users.push(userJson);
  res.json(userJson);
})

module.exports = router;
