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
directiveModule.directive('addTask', function($timeout){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: './addTask.html',
    controller: function($scope, $state, $stateParams, PostTask){
      $scope.newTask = {};
      $scope.saveTask = function(){
        //防止引用类型导致无法连续新增
        var newTask = angular.copy($scope.newTask);
        $scope.newTask = {};//重置
        newTask.status = 0;
        newTask.limitTime = getDate(newTask.limitTime);
        $scope.task[$scope.task[$stateParams.type].loverType].taskList.unshift(newTask);

        PostTask.saveTask('/saveTask', $scope.task)
          .success(function(data){
            console.log(data.message);
          })
      };
    },
    link: function(scope, element, attr){
      $(element).find('input[name=limitTime]')
        .keyup(function(){
          var value = this.value = this.value.replace(/[^0-9\-]/, "");
          var timer;
          if(timer){
            $timeout.cancel(timer);
          }else{
            timer = $timeout(function(){
              if(getDate(value) <= new Date()){
                console.log('时间不准确！');
                scope.addTaskForm.limitTime.$setValidity('validTime', false);
              }else{
                scope.addTaskForm.limitTime.$setValidity('validTime', true);
              }
            }, 350)
          }
        })
    }
  }
});


function getDate(dateStr){
  var date = dateStr.split('-');
  return new Date(date[0], date[1]-1, date[2]);
}
