var express = require('express');
var router = express.Router();

/* GET the first login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Indian Institute of Information Technology, Kota' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Indian Institute of Information Technology, Kota' });
});

router.get('/dashboard', function(req, res, next) {
    res.render('partials/dashboard', { title: 'Indian Institute of Information Technology, Kota' });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.get('/profile', function(req, res, next) {
    res.render('partials/profile', { title: 'User Profile' });
});

router.get('/createFeedback', function(req, res, next) {
    res.render('partials/feedback/createSurvey', { title: 'Create Survey' });
});

router.get('/courses',function(req,res,next){
    res.render('partials/courses/createCourses',{title:'Courses'});
});

router.get('/fresherRegistration',function(req,res,next){
    res.render('partials/studentRegistration/registrationDashboard',{title:'Student Registration'})
});
router.get('/addQuestion',function(req,res,next){
    res.render('partials/addQuestion/addQuestion',{title:'Add Question'})
});

router.get('/follower',function(req,res,next){
    res.render('partials/follower',{title:'Followers'});
});

router.get('/forgotpassword',function(req,res,next){
    res.render('forgotpassword',{title:'Forgot Password'});
});

router.get('/reportedPost',function(req,res,next){
    res.render('partials/reportedPost',{title:'Reported Post'});
});
module.exports = router;
