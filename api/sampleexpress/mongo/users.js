var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://admin:admin@cpsc436-basketball-shard-00-00-kbwxu.mongodb.net:27017,cpsc436-basketball-shard-00-01-kbwxu.mongodb.net:27017,cpsc436-basketball-shard-00-02-kbwxu.mongodb.net:27017/test?ssl=true&replicaSet=CPSC436-Basketball-shard-0&authSource=admin&retryWrites=true&w=majority';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  database = db

  usersCollection = db.collection('users')
});

module.exports = {}

module.exports.getUsers = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      const usersCollection = db.collection('users')
      usersCollection.find({}).toArray(function(err, docs) {
        if (err != null) {
          reject(err)
        }
        resolve(docs)
      });
    });
  });
}

module.exports.insertUser = function(user) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const usersCollection = db.collection('users')
      usersCollection.insert(user, function(err, docs) {
        if (err != null) {
          reject(err)
        }
        resolve(docs)
      });
    });
  });
}

module.exports.updateOneUserJwt = function(id, jwt, jwtIssued) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const usersCollection = db.collection('users')
      usersCollection.updateOne({_id: id}, {$set: {
        "JWTToken": jwt,
        "JWTIssued": jwtIssued
      }}, function(err, docs) {
        if (err != null) {
          reject(err)
        }
        console.log("Found the following records");
        console.log(docs)
        resolve(docs)
      });
    });
  });
}