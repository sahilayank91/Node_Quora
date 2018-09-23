let Post = require(__BASE__ + "modules/database/models/post");
let User = require(__BASE__ + "modules/database/models/user");

let mongoose = require('mongoose');
let LOGGER = require(__BASE__ + "modules/utils/Logger");
let Promise = require('bluebird');
let customUUID = require(__BASE__ + "modules/utils/CustomUUID");

let getCreateTemplate = function (parameters) {

    let template = {};
    for (let key in parameters) {
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
    // if (!template._id) {
    //     template._id = customUUID.getRandomAplhaNumeric();
    // }

    template.create_time = new Date();
    template.update_time = template.create_time;
    return template;
};

let getUpdateTemplate = function (parameters) {

    let template = {update_time: new Date()};
    for (let key in parameters) {
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


let getPosts = function (rule, fields, options) {

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

let countPosts = function (rule) {

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


let getPostById = function (id) {
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


let getPostsPopulated = function (rule, fields, options) {

    return new Promise(function (resolve, reject) {
        Post.find(rule, fields, options)
            .populate([
                {
                    path: "posted_by",
                    select: '_id firstname lastname name profilePic occupation'
                },
                {
                    path:"comment",
                }
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

let deletePost = function (rule) {

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

let createPost = function (parameters) {
    return new Promise(function (resolve, reject) {
        let template = getCreateTemplate(parameters);
        let record = new Post(template);
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




let updatePost = function (rule, template) {

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


let updatePostContentAndTags = function (rule, content, tags) {

    return new Promise(function (resolve, reject) {
        let template = getUpdateTemplate({content: content, tags: tags});
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


let doesPostBelongToTheGroup = function (postId, groupId) {
    return getPosts({_id: postId, group: groupId})
        .then(function (data) {
            if (data.length == 1) {
                return true;
            } else {
                return false;
            }
        });
}


let canUserDeleteThePersonalPost = function (userId, postId) {
    return getPosts({_id: postId, posted_by: userId})
        .then(function (data) {
            if (data.length == 1) {
                return true;
            } else {
                return false;
            }
        });
}



let createComment = function (rule, template) {
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

};


let addLike = function (rule, template) {
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

};

let disLike = function (rule, template) {
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

};
let upVoteAnswer = function (rule, template) {
    return new Promise(function (resolve, reject) {
        Post.update(rule, template, {upsert: true}, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('UpdatePost', err, rule, template);
                reject(new Error('Failed to update Post'));
            }
        });
    });

};
let savePost = function (rule, template) {
    return new Promise(function (resolve, reject) {
        User.update(rule, template, {upsert: true}, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('Updateuser', err, rule, template);
                reject(new Error('Failed to update user'));
            }
        });
    });
};

module.exports = {
    getPosts: getPosts,
    countPosts: countPosts,
    updatePost: updatePost,
    deletePost: deletePost,
    createPost: createPost,
    updatePostContentAndTags: updatePostContentAndTags,
    getPostsPopulated: getPostsPopulated,
    getPostById: getPostById,
    createComment:createComment,
    addLike:addLike,
    upVoteAnswer:upVoteAnswer,
    disLike:disLike,
    doesPostBelongToTheGroup: doesPostBelongToTheGroup,
    canUserDeleteThePersonalPost: canUserDeleteThePersonalPost,
    savePost:savePost
};
