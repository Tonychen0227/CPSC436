export const increment = amount => {
  return {
    //Payloads can be several, just cannot be duplicate names, think JSON
    type: 'INCREMENT_COUNTER',
    payload: amount
  };
};
