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
    batchURL:{
        addBatch: "service/batch/addBatch",
        updateBatch: "service/batch/updateBatch",
        deleteBatch: "service/batch/deleteBatch",
        getBatchList: "service/batch/getBatchList",
        updateBatchType: "service/batch/updateBatchType"
    },
    newsURL:{
        getNews:"service/news/getNews",
        addNews:"service/news/addNews",
        updateNews:"service/news/updateNews",
        deleteNews:"service/news/deleteNews"
    },
    eventURL:{
         getEvent:websiteURL+"service/event/getEvent",
         addEvent:"service/event/addEvent",
         updateEvent:"service/event/updateEvent",
         deleteEvent:"service/event/deleteEvent"
    },
    facultyURL:{
        addFaculty:"service/faculty/addFaculty",
        getFacultyList:"service/faculty/getFacultyList",
        deleteFaculty:"service/faculty/deleteFaculty",
        updateFaculty:"service/faculty/updateFaculty",
        uploadProfilePic:"service/faculty/uploadProfilePic",
        getDetailedFacultyInfo:"service/faculty/getDetailedFacultyInfo"
    },
    curriculumURL:{
        addSubject:"service/curriculum/addSubject",
        getSubjectList:"service/curriculum/getSubjectList",
        deleteSubject:"service/curriculum/deleteSubject",
        updateSubject:"service/curriculum/updateSubject"
    },
    fileURL:{
        uploadFile:"service/file/uploadFile",
        uploadDocument:"service/file/uploadDocument"
    }
};
