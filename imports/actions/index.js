const axios = require('axios');

export const flipPage = newPage => {
  return {
    type: 'NEW_PAGE',
    payload: newPage
  }
}

export const logOut = () => {
  return {
    type: 'LOG_OUT'
  }
}

export const userLogIn = (email, password, jwt) => {
  return {
    type: 'LOG_IN',
    payloadEmail: email,
    payloadPassword: password,
    payloadJwt: jwt
  }
}

export const loadNews = (news) => {
  console.log("from the action: ")
  console.log(news);
  return {
    type:'LOAD_NEWS',
    payload: news.articles
  }
}
