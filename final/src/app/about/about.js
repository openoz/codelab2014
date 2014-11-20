angular.module( 'codelab.about', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'app/about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'Contact Us' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope, $location, dataService ) {
  $scope.user = {};
  $scope.formSubmitted = false;

  $scope.user.phoneNumbers = [{'inputLabel':'dayPhone', 'displayLabel': 'Day Phone', 'data' : null },
    {'inputLabel':'ePhone', 'displayLabel': 'Evening Phone', 'data' : null },
    {'inputLabel':'fax', 'displayLabel': 'Fax', 'data' : null }];

  $scope.submitForm = function(contactForm){
    if(contactForm.$valid) {
      $scope.review = true;
    }
  };

  $scope.finallySubmit = function() {
    $scope.formSubmitted = true;
    dataService.setUser($scope.user);
    $location.path('home');
  }
});
