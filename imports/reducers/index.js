import {combineReducers} from 'redux';
import data from './data';
const MongoClient = require('mongodb').MongoClient;

const mongoConnectionString = "mongodb+srv://admin:admin@cpsc436-basketball-kbwxu.mongodb.net/test?retryWrites=true"

/*
MongoClient.connect(mongoConnectionString, function(err, client) {
  console.log(err);
  console.log("Connected successfully to server");
  client.close();
});
*/

const currentPageNumber = (pageNum = 1, action) => {
  if (action.type === 'NEW_PAGE') {
    return pageNum = action.payload;
  }
  return pageNum;
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
  news: newsStore
  //anotherKey: anotherReducer (all your reducers should be combined)
});
