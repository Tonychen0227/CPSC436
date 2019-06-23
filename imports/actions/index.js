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

const loginSuccess = todo => ({
  type: "LOG_IN_SUCCESS",
  payload: todo
});

const loginStarted = () => ({
  type: "LOG_IN_STARTED"
});

const loginFailure = error => ({
  type: "LOG_IN_FAILURE",
  payload: error
});

export const userLogIn = (email, password, jwt) => {
  return {
    type: 'LOG_IN',
    payloadEmail: email,
    payloadPassword: password,
    payloadJwt: jwt
    }

  return dispatch => {
    dispatch(loginStarted());
    axios
      .post(url, {
        email: email,
        password: password,
        jwt: jwt,
        completed: false
      })
      .then(res => {
        dispatch(loginSuccess(res.data));
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
