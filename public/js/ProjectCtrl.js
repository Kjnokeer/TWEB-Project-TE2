angular.module('twebProjectTE2')
  .controller('ProjectCtrl', function($scope, $rootScope, $location, $state, $http, user, stackExchangeInfos) {
    $rootScope.$on('$stateChangeStart', function (event, nextState, currentState) {
      // Check if nextState is connect page and if the user isn't logged in
      if(nextState.name != 'main' && nextState.name != 'connect' && !user.isLogged) {
        $rootScope.$broadcast('$stateChangeError');
        event.preventDefault();
        $state.go('connect');
      }
    });

    $rootScope.$on('$viewContentLoaded', function(event) {
      var path = $location.path();
      var access_token = getQueryVariable(path, 'access_token');
      stackExchangeInfos.setInfoIfNotExist('userToken', access_token);
      var key = stackExchangeInfos.getInfo('key');

      if(access_token) {
        user.isLogged = true;
        $rootScope.isLogged = user.isLogged;

        $state.go('sites');

        $http.get('https://api.stackexchange.com/2.2/sites?key=' + key).then(function successCallback(response) {
          if(response.status == 200) {
            $scope.availableSites = [];

            response.data.items.forEach(function(entry) {
              $scope.availableSites.push({
                'name' : entry.name,
                'iconUrl' : entry.icon_url,
                'apiSiteParameter' : entry.api_site_parameter
              });
            });
          }
        }, function errorCallback(response) {
          console.log('error: ' + response);
        });
      }
    });

    function getQueryVariable(path, toSearch) {
      var vars = path.substring(1).split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == toSearch) {
          return decodeURIComponent(pair[1]);
        }
      }

      return null;
    }

    // Function to redirect the user to the StackExchange oauth link
    $scope.connectToStackExchange = function() {
      window.location = 'https://stackexchange.com/oauth/dialog?client_id=6320&scope=&redirect_uri=http://127.0.0.1:3000';
    };

    // Function to choose the site to use
    $scope.chooseSite = function(siteName) {
      stackExchangeInfos.setInfoEvenIfExist('site', siteName);
      $state.go('myProfile');
    }
  });
