angular.module('codelab', [
    'codelab.dataservice',
    'codelab.home',
    'codelab.about',
    'ui.router'
])

    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })

    .run(function run() {
    })

    .controller('AppCtrl', function AppCtrl($scope, $location) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | codelab';
            }
        });

        $scope.emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,50}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,50}[a-zA-Z0-9])?)*$/;

        $scope.namePattern = /^[a-z ,.'-]+$/i;
        $scope.phonePattern = /^([0-9()+ -]*)$/;

        $scope.numberPattern = /^[0-9]+$/;
        $scope.numberPatternNegative = /^-?[0-9]+$/;

        $scope.usZipCodePattern = /^[0-9]{5}(-[0-9]{4})?$/;
        $scope.canZipPattern = /^[ABCEGHJKLMNPRSTVXY]{1}[0-9]{1}[A-Z]{1} *[0-9]{1}[A-Z]{1}[0-9]{1}$/;
    });