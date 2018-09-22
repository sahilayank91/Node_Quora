let postOperations = require(__BASE__+"modules/database/accessors/post_operations");


let createPost = function(parameters){
    console.log(parameters);
    return postOperations.createPost(parameters)
        .then(function(data){
            if(data){
                return data;
            }
        })
};



module.exports = {
    createPost:createPost
};