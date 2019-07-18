const axios = require('axios');
var sha256 = require('js-sha256');

//var url = 'https://cpsc436basketballapi.herokuapp.com'
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

export const userUploadProfilePicture = (email, password, base64) => {
  console.log(email, password, base64);
  return dispatch => {
    dispatch(uploadStarted());
    axios
      .post(url + '/users/uploadProfile', {
        email: email,
        password: password,
        base64: base64
      })
      .then(res => {
        dispatch(uploadSuccess(res.data));
      })
      .catch(err => {
        dispatch(uploadFailure(err.response.data));
      });
  };
};

const uploadStarted = () => ({
  type: "UPLOAD_STARTED"
});

const uploadFailure = error => ({
  type: "UPLOAD_FAILURE",
  payload: error
});

const uploadSuccess = (data) => ({
  type: "UPLOAD_SUCCESS",
  payload: data
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
        dispatch(loginFailure(err.response.data));
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

export const userRegister = (email, password, displayName, favTeam) => {
  var hash = sha256.create();
  hash.update(password);
  password = hash.hex();

  return dispatch => {
    dispatch(registerStarted());
    // TODO: Figure out time out
    //setTimeout(dispatch(registerFailure("Timed out")), 5000)
    axios
      .post(url + '/users/register', {
        email: email,
        password: password,
        displayName: displayName,
        favTeam: favTeam
      })
      .then(res => {
        dispatch(registerSuccess(res.data, res.data.JWTToken));
      })
      .catch(err => {
        dispatch(registerFailure(err.response.data));
      });
    };
};

const resetStarted = () => ({
  type: "RESET_STARTED"
});

const resetFailure = error => ({
  type: "RESET_FAILURE",
  payload: error
});

export const userReset = (email) => {
  return dispatch => {
    dispatch(resetStarted());
    axios
      .post(url + '/users/reset', {
        email: email,
        passwordReset: true
      })
      .then(res => {
        dispatch(resetFailure(res.data));
      })
      .catch(err => {
        dispatch(resetFailure(err.response.data));
      });
  };
};

const facebookLoginSuccess = data => ({
  type: "FACEBOOK_LOGIN_SUCCESS",
  payload: data
});

export const facebookLogIn = (id, email, token) => {
  return dispatch => {
    dispatch(loginStarted());
    axios
      .post(url + '/users/fbLogin', {
        id: id,
        email: email,
        token: token
      })
      .then(res => {
        dispatch(facebookLoginSuccess(res.data));
      })
      .catch(err => {
        dispatch(loginFailure(err.response.data));
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
