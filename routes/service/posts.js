let express = require('express');
let router = express.Router();
let userOperations = require(__BASE__+"modules/database/accessors/user_operations");
let ProfileOperations = require(__BASE__+"modules/database/accessors/profile_operations");
let path = require('path');
let cookieParser = require('cookie-parser');
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let DataValidator = require(__BASE__ + "modules/utils/DataValidator");
let client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
let UserController = require(__BASE__ + "modules/controller/UserController");
let TokenHandler = require(__BASE__ + "modules/controller/handler/TokenHandler");
let PostController = require(__BASE__ + "modules/controller/PostController");



router.post('/createPost',function(req,res){

    let posted_by = req.body.posted_by;
    let content = req.body.content;
    let parameters  = {
        posted_by:posted_by,
        content:content,
        type:req.body.type
    };
    PostController.createPost(parameters)
        .then(function(data){
            if(data){
                RESPONSE.sendOkay(res,{success:true,redirect:path.join("/"+'dashboard'),data:data});
            } else {
                console.log("Some error occured while getting data from the database");
            }
        }).catch(function (err) {
        console.log(err);
    });

});

router.post('/getDashboardPosts',function(req,res){
    let type = req.body.type;

    PostController.getPostbyType(type)
        .then(function(data){
            if(data){
                RESPONSE.sendOkay(res,{success:true,data:data});
            }else{
                console.log("Some error occured while getting data from the database");
            }
        }).catch(function (err) {
        console.log(err);
    });

});


router.post('/getPost',function(req,res){
    let id = req.body._id;

    PostController.getPostbyPoster(id)
        .then(function(data){
            if(data){

                RESPONSE.sendOkay(res,{success:true,data:data});
            }else{
                console.log("Some error occured while getting data from the database");
            }
        }).catch(function (err) {
            console.log(err);
    });

});

router.post('/getSavedPost',function(req,res){
    let id = req.body._id;

    PostController.getPostbyId(id)
        .then(function(data){
            if(data){

                RESPONSE.sendOkay(res,{success:true,data:data});
            }else{
                console.log("Some error occured while getting data from the database");
            }
        }).catch(function (err) {
        console.log(err);
    });

});



router.post('/comment',function(req,res){
    let user = req.body.user;
    let postId = req.body.post;
    let text = req.body.text;
    let profilePic = req.body.profilePic;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let occupation = req.body.occupation;
    let uploadedFile = req.body.uploadedFile;
    let created_at = new Date();
    var parameter = {
        user:user,
        firstname:firstname,
        lastname:lastname,
        text:text,
        profilePic:profilePic,
        occupation:occupation,
        created_at:created_at,
        uploadedFile:uploadedFile
        }
    ;

    let query = {
        $addToSet:{"comment":parameter},
        $inc:{"comment_count":1}
    };
    PostController.postComment(postId, query)
        .then(function(data){
                RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
            console.log("Error in submitting comments");
    })

});


router.post('/addLike',function(req,res){

    let postId = req.body.id;

    let query = {
        $inc:{"like":1}
    };
    PostController.addLike(postId, query)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments");
    })

});



router.post('/disLike',function(req,res){

    let postId = req.body.id;

    let query = {
        $inc:{"dislike":1}
    };
    PostController.disLike(postId, query)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments");
    })

});




router.post('/followUser',function(req,res){
    let userId = req.body.userId;
    let id = req.body.id;

    let query = {
        $addToSet:{"following":id}
    };
    UserController.followUser(userId, query, id)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments");
    })

});


router.post('/unfollowUser',function(req,res){
    let userId = req.body.userId;
    let id = req.body.id;

    let query = {
        $pull: { following: id } ,
    };
    UserController.unfollowUser(userId, query,id)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments");
    })

});

router.post('/upVoteAnswer',function(req,res){

    let postId = req.body.postId;
    let commentId  = req.body.commentId;
    let query = {
        _id:postId,
        "comment._id":commentId
    };
    console.log(query);
    let template = {
         $inc:{"upvote_count":1}
    };

    PostController.upVoteAnswer(query, template)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments",data);
    })

});


router.post('/savePost',function(req,res){

    let postId = req.body.postId;
    let _id  = req.body._id;
    let query = {
        _id:_id,
    };

    let template = {
        $addToSet:{"savedPost":postId}
    };

    PostController.savePost(query, template)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments",data);
    })

});

router.post('/suggestEdit',function(req,res){
    var parameter = {
        posted_by:req.body.posted_by,
        user:req.body.user,
        post:req.body.post,
        text:req.body.text,
        answer_posted:req.body.answer_posted
    };

    PostController.createSuggestion(parameter)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments",data);
    })

});

router.post('/getSuggestedEdits',function(req,res){
    var parameter = {
        user:req.body.user,
    };

    PostController.getSuggestedEdits(parameter)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments",data);
    })

});

router.post('/reportPost',function(req,res){
    var parameter = {
        reportedBy:req.body.reportedBy,
        post:req.body.post,
        reason:req.body.reason
    };

    PostController.reportPost(parameter)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments",data);
    })

});

router.post('/getReportedPost',function(req,res){
    let parameter = {
        actiontaken:req.body.actiontaken,
    };
    PostController.getReportedPost(parameter)
        .then(function(data){
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(data){
        console.log("Error in submitting comments",data);
    })

});

router.get('/logout',function(req,res){



    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});



module.exports = router;
