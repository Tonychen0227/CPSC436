const axios = require('axios');
var sha256 = require('js-sha256');

var url = 'http://localhost:3001'

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

const loginSuccess = (data, jwt) => ({
  type: "LOG_IN_SUCCESS",
  payload: data,
  payloadJWT: jwt
});

const loginStarted = () => ({
  type: "LOG_IN_STARTED"
});

const loginFailure = error => ({
  type: "LOG_IN_FAILURE",
  payload: error
});

const validateLogin = (email, password) => {
  return new Promise(function(resolve, reject) {
    console.log("begin delay")
    setTimeout(function() {
      console.log("end delay")
      if (email == "admin@admin.com" && password == "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892") {
        resolve(true)
      } else {
        reject(false)
      }
    }, 2000)
  })
}

export const userLogIn = (email, password, jwt) => {
  var hash = sha256.create();
  hash.update(password);
  password = hash.hex();

  return dispatch => {
    dispatch(loginStarted());
    /*
    axios
      .post(url, {
        email: email,
        password: password,
        jwt: jwt,
        completed: false
      })
      */
    validateLogin(email, password)
      .then(res => {
        dispatch(loginSuccess(res.data, ""));
      })
      .catch(err => {
        dispatch(loginFailure(err.message));
      });
  };
};

export const loadNews = (news) => {
  console.log("from the action: ")
  console.log(news);
  return {
    type:'LOAD_NEWS',
    payload: news.articles
  }
}
