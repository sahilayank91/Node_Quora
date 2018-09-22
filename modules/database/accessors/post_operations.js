var Post = require(__BASE__ + "modules/database/models/post");
var mongoose = require('mongoose');
var LOGGER = require(__BASE__ + "modules/utils/Logger");
var Promise = require('bluebird');

var getCreateTemplate = function (parameters) {

    var template = {};
    for (var key in parameters) {
        switch (key) {
            case 'posted_by':
            case 'group':
            case 'content':
            case 'tags':
            case 'type':
                template[key] = parameters[key];
                break;
        }
    }
    ;

    template.create_time = new Date();
    template.update_time = template.create_time;
    return template;
}

var getUpdateTemplate = function (parameters) {

    var template = {update_time: new Date()};
    for (var key in parameters) {
        switch (key) {
            case 'content':
            case 'comment_count':
            case 'tags':
                template[key] = parameters[key];
                break;
        }
    }
    ;
    return template;
}

/*
 order is important
 options : {
 skip: 30,
 limit : 5,
 }
 */

var getPosts = function (rule, fields, options) {

    return new Promise(function (resolve, reject) {
        Post.find(rule, fields, options).lean().exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('GetPosts', err, rule);
                reject(new Error('Failed to get Posts'));
            }
        });
    });
}

var countPosts = function (rule) {

    return new Promise(function (resolve, reject) {
        Post.count(rule).lean().exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('countPosts', err, rule);
                reject(new Error('Failed to count Posts'));
            }
        });
    });
}


var getPostById = function (id) {
    return new Promise(function (resolve, reject) {
        Post.findById(id, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('GetPosts', err);
                reject(new Error('Failed to get PostById'));
            }
        });
    });
}


var getPostsPopulated = function (rule, fields, options) {

    return new Promise(function (resolve, reject) {
        Post.find(rule, fields, options)
            .populate([
                {
                    path: "posted_by",
                    select: '_id username firstname lastname profile_pic'
                },
                {
                    path: "recipients",
                    select: '_id username firstname lastname profile_pic',
                },
                {
                    path: "group",
                    select: '_id name',
                },
                {
                    path: "tags",
                    select: '_id name',
                },
            ])
            .exec(function (err, data) {
                if (!err) {
                    resolve(data);
                } else {
                    LOGGER.logErrorMessage('getPostsPopulated', err, rule);
                    reject(new Error('Failed to get PostsPopulated'));
                }
            });
    });
}

var deletePost = function (rule) {

    return new Promise(function (resolve, reject) {
        Post.remove(rule, function (err, oldData) {
            if (!err) {
                resolve(oldData);
            } else {
                LOGGER.logErrorMessage('DeletePost', err, rule);
                reject(new Error('Failed to delete Post'));
            }
        });
    });

}

/*
 TODO: commenting, likes, attaching&removing files & images.
 */

var createPost = function (parameters) {
    return new Promise(function (resolve, reject) {
        var template = getCreateTemplate(parameters);
        var record = new Post(template);
        record.save(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('CreatePost', err, template);
                reject(new Error('Failed to create Post'));
            }
        });
    });
};




var updatePost = function (rule, template) {

    return new Promise(function (resolve, reject) {
        Post.update(rule, template, {upsert: false}, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('UpdatePost', err, rule, template);
                reject(new Error('Failed to update Post'));
            }
        });
    });

}


var updatePostContentAndTags = function (rule, content, tags) {

    return new Promise(function (resolve, reject) {
        var template = getUpdateTemplate({content: content, tags: tags});
        Post.update(rule, {$set: template}, {upsert: false}, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('updatePostContent', err, rule, template);
                reject(new Error('Failed to update PostContent'));
            }
        });
    });
};


var doesPostBelongToTheGroup = function (postId, groupId) {
    return getPosts({_id: postId, group: groupId})
        .then(function (data) {
            if (data.length == 1) {
                return true;
            } else {
                return false;
            }
        });
}


var canUserDeleteThePersonalPost = function (userId, postId) {
    return getPosts({_id: postId, posted_by: userId})
        .then(function (data) {
            if (data.length == 1) {
                return true;
            } else {
                return false;
            }
        });
}


module.exports = {
    getPosts: getPosts,
    countPosts: countPosts,
    updatePost: updatePost,
    deletePost: deletePost,
    createPost: createPost,
    updatePostContentAndTags: updatePostContentAndTags,
    getPostsPopulated: getPostsPopulated,
    getPostById: getPostById,
    doesPostBelongToTheGroup: doesPostBelongToTheGroup,
    canUserDeleteThePersonalPost: canUserDeleteThePersonalPost
};
