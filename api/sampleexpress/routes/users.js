var express = require('express');
var router = express.Router();
const shortid = require('shortid');
let jwt = require('jsonwebtoken');
const Users = require('../mongo/users');
const config = require('../config.js');

//TODO: Correct error message propagation
const checkToken = (jwtToken) => {
  let token = jwtToken
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return {
          success: false,
          message: 'Token is not valid'
        };
      } else {
        return {
          success: true,
          message: decoded
        }
      }
    });
  } else {
    return {
      success: false,
      message: 'Auth token is not supplied'
    };
  }
};

router.get('/', function(req, res, next){
  res.json(users);
});

const handleUsernamePasswordLogin = (users, email, password) => {
  // password should already be hashed
  for (var x = 0; x < users.length; x++) {
    if (users[x].email == email) {
      console.log(users[x].password, password);
      if (users[x].password == password) {
        let token = jwt.sign({email: email},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        users[x].jwtToken = token
        users[x].JWTIssued = new Date().toUTCString()
        //TODO: Update entry in mongo
        return users[x]
      } else {
        throw new Error("Unauthorized")
      }
    }
  }
  throw new Error("No corresponding user email found");
}

const handleJWTLogin = (users, jwt) => {
  for (var x = 0; x < users.length; x++) {
    if (users[x].jwt == jwt) {
      if (new Date() <= users[x].JWTIssued) {
        return users[x]
      }
    }
  }
  throw new Error("No corresponding JWT found")
}

router.post('/login', function(req, res, next) {
  Users.getUsers().then(success => {
    users = success
    if (req.body.email && req.body.password) {
      var result = handleUsernamePasswordLogin(users, req.body.email, req.body.password)
      /*
      if (!result.verified) {
        throw new Error("Verification email resent")
        //TODO: generate verification email and then send
      }
      */
      res.json(result)
    }
    if (req.body.jwt) {
      var result = handleJWTLogin(users, req.body.jwt)
      res.json(result)
    }
    throw new Error("No authentication supplied")
  }).catch(err => {
    console.log(err);
    next(err);
  })
})

const checkRegUser = (users, email, password) => {
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
  for (var x = 0; x < users.length; x++) {
    if (users[x]["email"] == email) {
      throw new Error("Email is taken")
    }
  }
  let token = jwt.sign({username: email},
    config.secret,
    { expiresIn: '24h' // expires in 24 hours
    }
  );
  let newDate = new Date()
  var userJson = {
    "email": email,
    "password": password,
    "JWTToken": token,
    "JWTIssued": newDate.toUTCString(),
    "FavoriteTeam": "",
    "AccountCreated": new Date().toLocaleDateString(),
    "SpecialPermissions": "",
    "VerificationToken": shortid.generate(),
    "Verified": false
  }
  //TODO: send verification email
  return userJson;
}

router.post('/register', function(req, res, next) {
  Users.getUsers().then(success => {
    users = success
    var userJSON = checkRegUser(users, req.body.email, req.body.password);
    Users.insertUser(userJSON).then(success => {
      res.json(userJSON);
    }).catch(err => {
      throw new Error(err);
    })
  }).catch(err => {
    console.log(err);
    next(err);
  })
})

module.exports = router;
