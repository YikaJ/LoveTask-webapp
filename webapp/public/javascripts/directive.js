var directiveModule = angular.module('DirectiveModule', []);

directiveModule.directive('loginForm', function($http, PostTask){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: './loginForm.html',
    link: function(scope, element, attr){
      $(element).find('.loginBtn').click(function(){
        var json = {
          username: scope.username,
          password: scope.password,
          autoLogin: scope.autoLogin
        };
        $http.post('/login', json)
          .success(function(data){
            if(data.response == 0){
              scope.loginError = data.message;
            }else{
              window.location.reload();
            }
          })
      });
    }
  }
});

directiveModule.directive('addTask', function(){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: './addTask.html',
    controller: function($scope, $state, $stateParams, PostTask){
      $scope.newTask = {};
      $scope.saveTask = function(){
        $scope.newTask.status = 0;
        $scope.task[$scope.task[$stateParams.type].loverType].taskList.push($scope.newTask);

        PostTask.saveTask('/addTask', $scope.task)
          .success(function(data){
            console.log(data.message);
          })
      };
    },
    link: function(){}
  }
});
