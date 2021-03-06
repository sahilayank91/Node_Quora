window.IS_DEVELOPER_MODE = true;
var websiteURL="http://www.iiitkota.ac.in/";
window.CONFIG = {
    originURL: window.IS_DEVELOPER_MODE ? "http://localhost:3000" : "",
    
    authenticateURL: {
        login: "service/authenticate/login",
        logout: "service/authenticate/logout",
        register: "service/authenticate/register",
        forgotPassword: "service/authenticate/forgotPassword",
        changePassword: "service/authenticate/changePassword",
        authenticate: "service/authenticate/auth",
        getLoggedInUser:"service/authenticate/getLoggedInUser",
        updateProfile: "service/authenticate/updateProfile",
        getProfile: "service/authenticate/getProfile",

        getNotification: "service/authenticate/getNotification",
        activateAccount: "service/authenticate/activateAccount",


    },
      registrationURL:{
              registerStudent:"service/registration/registerStudent",
              getRegisteredStudent:"service/registration/getRegistrationStudent"
          },
      userURL:{
          getUserFullDetail:"service/user/getUserDetail"
      },

    fileURL:{
        uploadFile:"service/file/uploadFile",
        uploadDocument:"service/file/uploadDocument"
    },
    postsURL: {
        retrieveGroupPosts: "service/post/getGroupPosts",
        createPost: "service/post/createPost",
        deletePost: "service/post/deletePost",
        postComment: "service/post/comment",
        dashboardPosts: "service/post/getDashboardPosts",
        getComments: "service/post/comments",
        getPost: "service/post/getPost",
        savePost: "service/post/savePost",
        getSavedPost: "service/post/getSavedPost",

        clearPost: "service/post/clearPost",

    suggestEdit: "service/post/suggestEdit",
        getSuggestedEdits: "service/post/getSuggestedEdits",
        getReportedPost: "service/post/getReportedPost",

        reportPost: "service/post/reportPost",

        uploadFiles: "service/file/attachment/upload",
        addLike:"service/post/addLike",
        disLike:"service/post/disLike",
        followUser:"service/post/followUser",
        unfollowUser:"service/post/unfollowUser",
        upVoteAnswer:"service/post/upVoteAnswer",
        downVoteAnswer:"service/post/downVoteAnswer",

        getRecommendations: "service/internal/getRecommendationForUser"
    },
};
