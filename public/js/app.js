angular.module('twebProjectTE2', [
  'ui.router'
  //'app.ProjectCtrl'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'views/index.jade'
      })
      .state('connect', {
        url: '/connect',
        templateUrl: 'views/partials/connect.jade'
      });
      /*.state('board', {
        url: '/board',
        templateUrl: 'views/partials/board.jade'
      })
      .state('debug', {
        url: '/debug',
        templateUrl: 'views/partials/debug.jade'
      });*/
  });
