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

export const userLogIn = (email, password, jwt) => {
  if (password) {
    var hash = sha256.create();
    hash.update(password);
    password = hash.hex();
  }

  return dispatch => {
    dispatch(loginStarted());
    axios
      .post(url + '/users/login', {
        email: email,
        password: password,
        jwt: jwt
      })
      .then(res => {
        dispatch(loginSuccess(res.data, res.data.JWTToken));
      })
      .catch(err => {
        dispatch(loginFailure(" " + err.response.status + " " + err.response.data));
      });
  };
};

const registerSuccess = (data, jwt) => ({
  type: "REGISTER_SUCCESS",
  payload: data,
  payloadJWT: jwt
});

const registerStarted = () => ({
  type: "REGISTER_STARTED"
});

const registerFailure = error => ({
  type: "REGISTER_FAILURE",
  payload: error
});

export const userRegister = (email, password) => {
  var hash = sha256.create();
  hash.update(password);
  password = hash.hex();

  return dispatch => {
    dispatch(registerStarted());
    axios
      .post(url + '/users/register', {
        email: email,
        password: password
      })
      .then(res => {
        dispatch(registerSuccess(res.data, res.data.JWTToken));
      })
      .catch(err => {
        dispatch(registerFailure(" " + err.response.status + " " + err.response.data));
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
