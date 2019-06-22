const axios = require('axios');

export const flipPage = newPage => {
  return {
    type: 'NEW_PAGE',
    payload: newPage
  }
}

export const userLogIn = (email, password) => {
  return {
    type: 'LOG_IN',
    payloadEmail: email,
    payloadPassword: password
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
