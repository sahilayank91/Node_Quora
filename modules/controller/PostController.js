let postOperations = require(__BASE__+"modules/database/accessors/post_operations");
let commentOperations = require(__BASE__+"modules/database/accessors/comment_operations");


let createPost = function(parameters){
    console.log(parameters);
    return postOperations.createPost(parameters)
        .then(function(data){
            if(data){
                return data;
            }
        })
};

let getPostbyType = function(parameter){
    return postOperations.getPostsPopulated({type:parameter})
        .then(function(data){
        if(data){
            return data;
        }else{
        console.log("Error occured in getting the posts");
        }


    }).catch(function(err){
        console.log(err);
    })
};
let getPostbyPoster = function(id){
    return postOperations.getPostsPopulated({posted_by:id})
        .then(function(data){
            if(data){
                return data;
            }else{
                console.log("Error occured in getting the posts");
            }


        }).catch(function(err){
            console.log(err);
        })
};

let getPostbyId = function(id){
    return postOperations.getPostsPopulated({_id:id})
        .then(function(data){
            if(data){

                return data;
            }else{
                console.log("Error occured in getting the posts");
            }


        }).catch(function(err){
            console.log(err);
        })
};


let postComment = function (postId, query) {
    return postOperations.createComment({_id: postId},query)
        .then(function (comment) {

           return comment;
            // postOperations.updatePost({_id: postId},{$push:{"comment":comment}});
            // return comment;
        });
};

let addLike = function (postId, query) {
    return postOperations.addLike({_id: postId},query)
        .then(function (data) {
            return data;
        });
};

let disLike = function (postId, query) {
    return postOperations.disLike({_id: postId},query)
        .then(function (data) {
            return data;
        });
};
let upVoteAnswer = function (query, template) {
    return postOperations.upVoteAnswer(query,template)
        .then(function (data) {
            return data;
        });
};

let savePost = function (query, template) {
    return postOperations.savePost(query,template)
        .then(function (data) {
            return data;
        });
};


let createSuggestion = function(parameters){
    console.log(parameters);
    return postOperations.createSuggestion(parameters)
        .then(function(data){
            if(data){
                return data;
            }
        })
};

let getSuggestedEdits = function(query){
    return postOperations.getSuggestedEdits(query)
        .then(function(data){
            if(data){
                return data;
            }else{
                console.log("Error occured in getting the posts");
            }


        }).catch(function(err){
            console.log(err);
        })
};


module.exports = {
    createPost:createPost,
    getPostbyType:getPostbyType,
    postComment:postComment,
    addLike:addLike,
    disLike:disLike,
    getPostbyId:getPostbyId,
    upVoteAnswer:upVoteAnswer,
    savePost:savePost,
    getPostbyPoster:getPostbyPoster,
    createSuggestion:createSuggestion,
    getSuggestedEdits:getSuggestedEdits
};