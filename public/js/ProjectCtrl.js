angular.module('twebProjectTE2')
  .controller('ProjectCtrl', function($scope, $rootScope) {
    $scope.connectToStackExchange = function() {
      window.location = 'https://stackexchange.com/oauth/dialog?client_id=6320&scope=&redirect_uri=http://127.0.0.1:3000/#/connect';
    };

    $rootScope.$on('$viewContentLoading', function(event, viewConfig) {
      console.log(event);
      console.log(viewConfig);
    });
  });
