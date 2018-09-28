ASK_BIN.filter('roleFilter', function () {
    return function (role) {
        return window.UTILITIES.ENUM_FILTER_MAPPING.roleConfigMapping(role);
    };
});
