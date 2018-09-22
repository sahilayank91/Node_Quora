var News = require(__BASE__ + 'modules/database/models/news');
var Promise = require('bluebird');


var getCreateTemplate = function(parameters){
    var template = {};
    for(var key in parameters){
        switch(key){
            case 'type':
            case 'posted_by':
            case 'content':
            case 'file':
            case 'link':
            case 'linkheader':
            case 'uploadTitle':
                template[key] = parameters[key];
                break;
        }
    }
    template.create_time = new Date();
    return template;
};

var createNews = function(parameters){
    return new Promise(function(resolve,reject){
       var template = getCreateTemplate(parameters);
       var news = new News(template);
       news.save(function(err,data){
            if(data){
                resolve(data);
            }else{
                console.log("Error occured /createNews",err);
                reject(new Error('Failed to create News'));
            }
       });
    });
};

var getNews = function(rule,fields,options){
  return new Promise(function(resolve,reject){
      News.find(rule, fields, options).exec(function (err, data) {
          if (!err) {
              resolve(data);
          } else {
              reject(new Error('Failed to get News'));
          }
      });
  });
};


var updateNews = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        News.findOneAndUpdate(rule, fields, {upsert: true}).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to update News'));
            }
        });
    });
};

var deleteNews = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        News.remove(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to Remove News'));
            }
        });
    });
};




module.exports = {
    createNews:createNews,
    getNews:getNews,
    updateNews:updateNews,
    deleteNews:deleteNews
};