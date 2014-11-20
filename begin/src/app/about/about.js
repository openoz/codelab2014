angular.module( 'codelab.about', [
  'ui.router',
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
    data:{ pageTitle: 'About Us' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope ) {

});
