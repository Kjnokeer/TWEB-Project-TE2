angular.module('twebProjectTE2')
  .controller('StackExchangeCtrl', function(stackExchangeInfos, $http, $scope, $rootScope) {
    $rootScope.site = stackExchangeInfos.getInfo('site');

    $rootScope.$on('$stateChangeStart', function (event, nextState, currentState) {
      // Check if nextState is connect page and if the user isn't logged in
      if(nextState.name == 'myProfile' && !stackExchangeInfos.getInfo('site') == undefined) {
        $rootScope.$broadcast('$stateChangeError');
        event.preventDefault();
        $state.go('sites');
      }
    });

    var key = stackExchangeInfos.getInfo('key');
    var userToken = stackExchangeInfos.getInfo('userToken');
    var site = stackExchangeInfos.getInfo('site');

    $http.get('https://api.stackexchange.com/2.2/me?key=' + key + '&access_token=' + userToken + '&site=' + site).then(function successCallback(response) {
      if(response.status == 200) {
        if(response.data.items.length > 0) {
          $scope.userInfos = response.data.items[0];
        }
      }
    }, function errorCallback(response) {
      console.log(response);
    });
  });
