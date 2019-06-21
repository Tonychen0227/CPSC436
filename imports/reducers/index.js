import {combineReducers} from 'redux';
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
    var key = 0;
    var topSixNews = action.payload;
    Array.from(topSixNews).forEach((currentNews) =>{
        news.push({key: ++(this.key), image: currentNews.articles.images.url, description: currentNews.articles.description, link: currentNews.articles.links.web.href});
        console.log("from the loop")
        console.log(news);
    });
    console.log("from the reducer: ")
    console.log(news);
    return news;
  }
  return news;
}

export default combineReducers ({
  pageNum: currentPageNumber,
  news: newsStore
  //anotherKey: anotherReducer (all your reducers should be combined)
});
