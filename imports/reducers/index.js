import {combineReducers} from 'redux';
import data from './data';
var sha256 = require('js-sha256');
const axios = require('axios');

const apiUrl = "http:/localhost:3001"

const currentPageNumber = (pageNum = 1, action) => {
  if (action.type === 'NEW_PAGE') {
    return pageNum = action.payload;
  }
  return pageNum;
}

const loading = (loading = false, action) => {
  if (action.type.indexOf('STARTED') != -1) {
    loading = true
  }
  else {
    loading = false
  }
  return loading
}

const userState = (userState={isLoggedIn: false, loginAttempted: 0, userData: {}, jwt: "", errorMessage: null}, action) => {
  if (action.type === 'LOG_IN_STARTED' || action.type === 'REGISTER_STARTED') {
  }
  if (action.type === 'LOG_IN_SUCCESS' || action.type === 'REGISTER_SUCCESS') {
    localStorage.setItem("CachedJWT", action.payloadJWT)
    return { ...userState, 
      isLoggedIn: true,
      loginAttempted: 0,
      userData: action.payload,
      jwt: action.payloadJWT,
      errorMessage: null};
  }
  if (action.type === 'LOG_IN_FAILURE') {
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: userState.loginAttempted + 1,
      userData: null,
      jwt: "",
      errorMessage: action.payload + " (at " + new Date().toUTCString() + " UTC)"};
  }
  if (action.type === 'REGISTER_FAILURE') {
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: 0,
      userData: null,
      jwt: "",
      errorMessage: action.payload + " (at " + new Date().toUTCString() + " UTC)"};
  }
  if (action.type === 'LOG_OUT') {
    localStorage.removeItem("CachedJWT")
    userState.isLoggedIn = false;
    userState.loginAttempted = 0;
    return { ...userState, 
      isLoggedIn: false,
      loginAttempted: 0,
      userData: null,
      jwt: ""};
  }
  return userState;
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

export default combineReducers ({
  pageNum: currentPageNumber,
  data,
  news: newsStore,
  userState: userState,
  loading: loading
  //anotherKey: anotherReducer (all your reducers should be combined)
});
