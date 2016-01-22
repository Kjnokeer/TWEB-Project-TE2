angular.module('twebProjectTE2', [
  'ui.router'
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
      .state('sites', {
        url: '/sites',
        templateUrl: 'views/partials/sites.jade'
      })
      .state('myProfile', {
        url: '/myProfile',
        templateUrl: 'views/partials/myProfile.jade',
        controller: 'MyProfileCtrl'
      })
      .state('events', {
        url: '/events',
        templateUrl: 'views/partials/events.jade',
        controller: 'EventsCtrl'
      });
  })
  .factory('user', function() {
    return {};
  })
  .factory('stackExchangeInfos', function() {
    var infos = [];

    infos['key'] = 'jdLx3MZCVUU6IHkZUUoTvg((';

    return {
      getInfo(key) {
        return infos[key];
      },
      setInfoIfNotExist: function(key, value) {
        if(infos[key] == undefined) {
          infos[key] = value;
        }
      },
      setInfoEvenIfExist: function(key, value) {
        infos[key] = value;
      }
    };
  })
