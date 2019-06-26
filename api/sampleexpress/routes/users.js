var express = require('express');
var router = express.Router();
const shortid = require('shortid');
let jwt = require('jsonwebtoken');
const Users = require('../mongo/users');
const config = require('../config.js');

//TODO: Correct error codes and details being sent

router.get('/', function(req, res, next){
  res.json(users);
});

const handleUsernamePasswordLogin = (users, email, password) => {
  // password should already be hashed
  for (var x = 0; x < users.length; x++) {
    if (users[x].email == email) {
      if (users[x].password == password) {
        let token = jwt.sign({email: email},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        users[x].JWTToken = token
        users[x].JWTIssued = new Date().toUTCString()
        Users.updateOneUserJwt(users[x]._id, users[x].JWTToken, users[x].JWTIssued).then(success => {
          console.log(users[x]._id, users[x].jwtToken, users[x].JWTIssued)
          Users.getUsers().then(succ => {
            for (var x = 0; x < succ.length; x++) {
              if (succ[x].email == email) {
                return succ[x]
              }
            }
          }).catch(err => {
            throw new Error(err)
          })
        }).catch(err => {
          next(err)
        })
        return users[x]
      } else {
        throw new Error("Unauthorized")
      }
    }
  }
  throw new Error("No corresponding user email found");
}

const handleJWTLogin = (users, jwt) => {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      throw new Error("Invalid token")
    }
  });
  for (var x = 0; x < users.length; x++) {
    if (users[x].jwt == jwt) {
      let date = new Date(users[x].JWTIssued)
      if (new Date() <= date.setDate(date.getDate() + 1)) {
        return users[x]
      } else {
        throw new Error ("Token expired")
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
    else if (req.body.jwt) {
      var result = handleJWTLogin(users, req.body.jwt)
      res.json(result)
    } else {
      throw new Error("No authentication supplied")
    }
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
