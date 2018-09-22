IIITK_ERP.factory('DataFactory',function(){

    function getResult(token){
        return localStorage.getItem(token)
    }
    function setResult(token,data){
        localStorage.setItem(token,data);
    }
    function deleteResult(token){
        localStorage.removeItem(token);
    }

    return {
        getResult:getResult,
        setResult:setResult,
        deleteResult:deleteResult
    };
});