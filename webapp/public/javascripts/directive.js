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

//增加任务
directiveModule.directive('addTask', function(){
  return {
    restrict: 'EA',
    replace: true,
    required: 'ngModel',
    templateUrl: './addTask.html',
    controller: function($scope, $state, $stateParams, PostTask){
      $scope.newTask = {};
      $scope.saveTask = function(){
        //防止引用类型导致无法连续新增
        var newTask = angular.copy($scope.newTask);
        $scope.newTask = {};//重置
        newTask.status = 0;
        var date = newTask.limitTime.split('-');
        newTask.limitTime = new Date(date[0], date[1]-1, date[2]);
        $scope.task[$scope.task[$stateParams.type].loverType].taskList.unshift(newTask);

        PostTask.saveTask('/saveTask', $scope.task)
          .success(function(data){
            console.log(data.message);
          })
      };
    },
    link: function(scope, element, attr){
      $(element).find('input[name=limitTime]').keyup(function(){
        //console.log($(this).val());
        this.value = this.value.replace(/[^0-9\-]/, "");
      });
    }
  }
});
