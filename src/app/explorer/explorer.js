angular.module( 'codelab.explorer', [
    'ui.router'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'explorer', {
        url: '/explorer',
        views: {
            "main": {
                controller: 'ExplorerCtrl',
                templateUrl: 'app/explorer/explorer.tpl.html'
            }
        },
        data:{ pageTitle: 'Explorer' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'ExplorerCtrl', function ExplorerCtrl( $scope ) {

});
