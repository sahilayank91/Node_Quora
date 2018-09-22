var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var ProfileOperations = require(__BASE__+"modules/database/accessors/profile_operations");
var path = require('path');
var cookieParser = require('cookie-parser');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DataValidator = require(__BASE__ + "modules/utils/DataValidator");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
var UserController = require(__BASE__ + "modules/controller/UserController");
var TokenHandler = require(__BASE__ + "modules/controller/handler/TokenHandler");
var PostController = require(__BASE__ + "modules/controller/PostController");



router.post('/createPost',function(req,res){

    var posted_by = req.body.posted_by;
    var content = req.body.content;

    var parameters  = {
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
