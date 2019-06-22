import {combineReducers} from 'redux';
const MongoClient = require('mongodb').MongoClient;
var sha256 = require('js-sha256');

const mongoConnectionString = "mongodb+srv://admin:admin@cpsc436-basketball-kbwxu.mongodb.net/test?retryWrites=true"

/*
MongoClient.connect(mongoConnectionString, function(err, client) {
  console.log(err);
  console.log("Connected successfully to server");
  client.close();
});
*/

const currentPageNumber = (pageNum = 1, action) => {
  if (action.type === 'NEW_PAGE') {
    return pageNum = action.payload;
  }
  return pageNum;
}

const validateLogin = (email, password) => {
  var hash = sha256.create();
  hash.update(password);
  hash = hash.hex();
  if (email == "admin@admin.com" && hash == "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892") {
    return true
  } else {
    return false
  }
}

const userLogIn = (
  isLoggedIn = false, action) => {
  if (action.type === 'LOG_IN') {
    isLoggedIn = validateLogin(action.payloadEmail, action.payloadPassword)
  }
  return isLoggedIn
}

const loginAttempted = (loginAttempted = 0, action) => {
  if (action.type === 'LOG_IN') {
    loginAttempted = loginAttempted + 1
  }
  return loginAttempted
}
export default combineReducers ({
  pageNum: currentPageNumber,
  isLoggedIn: userLogIn,
  loginAttempted: loginAttempted
  //anotherKey: anotherReducer (all your reducers should be combined)
});
