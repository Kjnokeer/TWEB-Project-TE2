angular.module('twebProjectTE2')
  .controller('EventsCtrl', function(stackExchangeInfos, $http, $scope, $rootScope) {
    $rootScope.site = stackExchangeInfos.getInfo('site');

    $rootScope.$on('$stateChangeStart', function (event, nextState, currentState) {
      // Check if nextState is connect page and if the user isn't logged in
      if(nextState.name == 'events' && !stackExchangeInfos.getInfo('site') == undefined) {
        $rootScope.$broadcast('$stateChangeError');
        event.preventDefault();
        $state.go('sites');
      }
    });

    var key = stackExchangeInfos.getInfo('key');
    var userToken = stackExchangeInfos.getInfo('userToken');
    var site = stackExchangeInfos.getInfo('site');

    // Repris depuis le site https://jtblin.github.io/angular-chart.js/
    $scope.chart = {
      'labels': ["January", "February", "March", "April", "May", "June", "July"],
      'series': ['Series A', 'Series B'],
      'data': [[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90]]
    };
    /* Ne fonctionne pas
    $scope.chart = {
      'labels': ["January", "February", "March", "April", "May", "June", "July"],
      'series': [
        'Posting a question'
        'Posting an answer',
        'Posting a comment',
        'Editing a post',
        'Creating a user'
      ],
      'series': ['Series A', 'Series B'],
      'data': [[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90]]
    };
    */

    $http.get('https://api.stackexchange.com/2.2/events?key=' + key + '&access_token=' + userToken + '&site=' + site).then(function successCallback(response) {
      if(response.status == 200) {
        if(response.data.items.length > 0) {
          response.data.items.forEach(function(entry) {
            //$scope.chart.labels.push(entry.creation_date);
          });
        }
      }
    }, function errorCallback(response) {
      console.log(response);
    });
  });
