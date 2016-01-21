angular.module('twebProjectTE2', [
  'ui.router'
  //'app.ProjectCtrl'
])
  .config(function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'views/index.jade'
      })
      .state('connect', {
        url: '/connect',
        templateUrl: 'views/partials/connect.jade'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/partials/dashboard.jade'
      });
  })
  .factory('user', function() {
    return {};
  });
