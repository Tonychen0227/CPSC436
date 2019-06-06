import {combineReducers} from 'redux';
const MongoClient = require('mongodb').MongoClient;

const mongoConnectionString = "mongodb+srv://admin:@cpsc436-basketball-kbwxu.mongodb.net/test?retryWrites=true"

/*
MongoClient.connect(mongoConnectionString, function(err, client) {
  console.log(err);
  console.log("Connected successfully to server");
  client.close();
});
*/

const counterReducer = (count = 0, action) => {
  if (action.type === 'INCREMENT_COUNTER') {
    return count + action.payload;
  }
  return count;
}

const currentPageNumber = (pageNum = 1, action) => {
  if (action.type === 'NEW_PAGE') {
    return pageNum = action.payload;
  }
  return pageNum;
}

export default combineReducers ({
  count: counterReducer,
  pageNum: currentPageNumber
  //anotherKey: anotherReducer (all your reducers should be combined)
});
