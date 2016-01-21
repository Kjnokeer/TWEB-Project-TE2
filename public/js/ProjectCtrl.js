angular.module('twebProjectTE2')
  .controller('ProjectCtrl', function($scope, $rootScope, $location, $state, $http, user) {
    $rootScope.$on('$stateChangeStart', function (event, nextState, currentState) {
      // Check if nextState is connect page and if the user isn't logged in
      if(nextState.name != 'main' && nextState.name != 'connect' && !user.isLogged) {
        $rootScope.$broadcast('$stateChangeError');
        event.preventDefault();
        $state.go('connect');
      }
    });

    // Function to redirect the user to the StackExchange oauth link
    $scope.connectToStackExchange = function() {
      window.location = 'https://stackexchange.com/oauth/dialog?client_id=6320&scope=&redirect_uri=http://127.0.0.1:3000';
    };

    $rootScope.$on('$viewContentLoaded', function(event) {
      var path = $location.path();
      var access_token = getQueryVariable(path, 'access_token');
      var key = 'jdLx3MZCVUU6IHkZUUoTvg((';

      if(access_token) {
        user.isLogged = true;

        $state.go('dashboard');

        $http.get('https://api.stackexchange.com/2.2/sites?key=' + key).then(function successCallback(response) {
          if(response.status == 200) {
            user.availableSites = [];

            response.data.items.forEach(function(entry) {
              user.availableSites.push({
                'name' : entry.name,
                'iconUrl' : entry.icon_url,
                'apiSiteParameter' : entry.api_site_parameter
              });
            });

            $scope.availableSites = user.availableSites;
          }
        }, function errorCallback(response) {
          console.log(response);
        });

        //'https://api.stackexchange.com/2.2/me?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=reputation&access_token=ZTFXq3(RBfSGBYNJsrnT4g))&filter=default'
        /*$http.get('https://api.stackexchange.com/2.2/me?key=' + key + '&access_token=' + access_token + '&site=stackoverflow').then(function successCallback(response) {
          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });*/
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
  });
