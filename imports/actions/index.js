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
