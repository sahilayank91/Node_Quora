var Event = require(__BASE__ + 'modules/database/models/event');
var Promise = require('bluebird');
var customUUID = require(__BASE__ + "modules/utils/CustomUUID");

var getCreateTemplate = function(parameters){
        var template={};
        for(var key in parameters){
            switch(key){
                case 'type':
                case 'posted_by':
                case 'title':
                case 'organizer':
                case 'description':
                case 'date':
                case 'eventPhoto':
                    template[key] = parameters[key];
            }
        }
    template.create_time = new Date();

    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();
    }

    return template;
};


var createEvent = function(parameters){
    return new Promise(function(resolve,reject){
        var template = getCreateTemplate(parameters);
        var event = new Event(template);
        event.save(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('createEvent failed'));
            }
        });
    });
};



var getEvents = function(rule,fields ,options){
  return new Promise(function(resolve,reject){
     Event.find(rule,fields,options).exec(function(err,data){
         if(!err){
             resolve(data);
         }else{
             reject(new Error("Failed to get Evenets"));
         }
     })
  });
};

var updateEvent = function(rule, fields ,options){
    return new Promise(function(resolve, reject){
        Event.findOneAndUpdate(rule,fields, options).exec(function(err, data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Events"));
            }
        });
    });
};

var deleteEvent = function(rule, fields ,options){
    return new Promise(function(resolve, reject){
        Event.remove(rule,fields, options).exec(function(err, data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Events"));
            }
        });
    });
};
module.exports = {
    createEvent:createEvent,
    getEvent:getEvents,
    updateEvent:updateEvent,
    deleteEvent:deleteEvent
}