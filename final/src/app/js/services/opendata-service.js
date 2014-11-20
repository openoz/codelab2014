var module = angular.module("codelab.opendataService", []);

module.factory("OpenDataService", ["$http", "$q", function($http, $q) {
    var openData = {
        getData:function() {
            var deferredOpenData = $q.defer();

            var url = "http://data.consumerfinance.gov/api/views.json";

            $http.get(url)
                .success(function (resp) {
                    deferredOpenData.resolve(resp);
                }).error(function () {
                    deferredOpenData.reject("Failed to load reference data for address type");
                });

            return deferredOpenData.promise;
        }
    };

    return {
        openData: openData
    }
}]);
