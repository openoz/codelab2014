var module = angular.module('codelab.dataservice', []);

module.factory('dataService', [function() {
    var user;

    var setUser = function(someUser) {
        user = someUser;
    };

    var getUser = function() {
        return user;
    };

    return {setUser:setUser, getUser:getUser};
}]);