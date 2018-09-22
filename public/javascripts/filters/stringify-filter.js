FollowClassApplication.filter('stringify', function () {
    return function (item) {
        if (item) {
            if (typeof item === 'object')
                item = JSON.stringify(item);
            
            return item.replace(/\'+/g, "\\\'");
        } else {
            return "";
        }
    };
});
