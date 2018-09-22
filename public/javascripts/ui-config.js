window.IS_DEVELOPER_MODE = true;
var websiteURL="http://www.iiitkota.ac.in/";
window.CONFIG = {
    originURL: window.IS_DEVELOPER_MODE ? "http://localhost:3000" : "",
    
    authenticateURL: {
        login: "service/authenticate/login",
        logout: "service/authenticate/logout",
        register: "service/authenticate/register",
        forgotPassword: "service/authenticate/forgotPassword",
        resetPassword: "service/authenticate/resetPassword",
        authenticate: "service/authenticate/auth",
        getLoggedInUser:"service/authenticate/getLoggedInUser",
        updateProfile: "service/authenticate/updateProfile",
        getProfile: "service/authenticate/getProfile"
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
        deletePost: "service/post/delete",
        postComment: "service/post/comment",
        dashboardPosts: "service/post/getDashboardPosts",
        getComments: "service/post/comments",
        uploadFiles: "service/file/attachment/upload",
        getRecommendations: "service/internal/getRecommendationForUser"
    },
};
