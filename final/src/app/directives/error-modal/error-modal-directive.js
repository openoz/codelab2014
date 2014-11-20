angular.module('codelab.errorModal', [])
    .controller('codelabErrorModalController', function($scope) {
        $scope.name = 'errorModal';
    })
    .directive('codelabErrorModal', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'directives/error-modal/error-modal.tpl.html',
            controller: 'codelabErrorModalController'
        };
    });
