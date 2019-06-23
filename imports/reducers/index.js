import {combineReducers} from 'redux';
import data from './data';
const MongoClient = require('mongodb').MongoClient;
var sha256 = require('js-sha256');
const axios = require('axios');

const mongoConnectionString = "mongodb+srv://admin:admin@cpsc436-basketball-kbwxu.mongodb.net/test?retryWrites=true"

const apiUrl = "http:/localhost:3001"
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

const validateLogin = (email, password, jwt) => {
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
    isLoggedIn = validateLogin(action.payloadEmail, action.payloadPassword, action.payloadJwt)
  }
  if (action.type === 'LOG_OUT') {
    isLoggedIn = false;
  }
  return isLoggedIn
}

const loginAttempted = (loginAttempted = 0, action) => {
  if (action.type === 'LOG_IN') {
    loginAttempted = loginAttempted + 1
  }
  if (action.type === 'LOG_OUT') {
    loginAttempted = 0;
  }
  return loginAttempted
}

const newsStore = (news = [], action) => {
  if(action.type === "LOAD_NEWS") {
    /*var key = 0;
    var topSixNews = action.payload.articles; // to to get the array
    Array.from(topSixNews).forEach((currentNews) =>{
        news.push({key: key, image: currentNews.images[0].url, headline: currentNews.headline, link: currentNews.links.web.href});
        key++;
        console.log("from the loop")
        console.log(news);
    });*/
    console.log("from the reducer: ")
    console.log(news);
    return action.payload;
    //return action.payload;
  }
  return news;
}

const initialState = {
  loading: false,
  todos: [],
  error: null
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO_STARTED":
      return {
        ...state,
        loading: true
      };
    case "ADD_TODO_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        todos: [...state.todos, action.payload]
      };
    case "ADD_TODO_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export default combineReducers ({
  pageNum: currentPageNumber,
  data,
  news: newsStore,
  isLoggedIn: userLogIn,
  loginAttempted: loginAttempted,
  todosReducer: todosReducer
  //anotherKey: anotherReducer (all your reducers should be combined)
});
