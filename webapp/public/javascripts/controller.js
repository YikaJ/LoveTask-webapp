var myModule = angular.module('TaskListModule', []);

myModule.controller('TaskListCtrl', ['$scope', '$http', '$state', '$stateParams', '$timeout', 'PostTask', function($scope, $http, $state, $stateParams, $timeout, PostTask){
  $scope.task = [{}, {}];
  $http.get('/getTask')
    .success(function(data){
      $scope.task = data;
    });
  //剩余未完成的任务
  $scope.remaining = function(taskType) {
    if(isNaN(taskType)) return 0;
    //console.log($scope.task, taskType);
    if(typeof $scope.task[taskType].taskList === 'undefined') return 0;

    return $scope.task[taskType].taskList.filter(function (task) {
      return task.status === 0;
    }).length;
  };

  //清除已完成的任务
  $scope.clearTask = function(taskType, status){
    var taskList = $scope.task[taskType].taskList;
    $scope.task[taskType].taskList = taskList.filter(function (task) {
      return task.status !== status;
    });
  };

  //改变任务状态，因为task参数是引用类型，所以会将引用类型的地址传递给参数。
  //所以修改局部变量可以影响到外部变量。
  $scope.changeStatus = function(task){
    var timer = null;
    task.status = task.status ? 0 : 1;

    if(timer){
      timer.cancel();
    }else{
      timer = $timeout(function(){
        PostTask.saveTask('/changeStatus', $scope.task)
          .success(function(data){
            console.log(data.message);
          });
      }, 500)
    }
  };
  $scope.showAddTask = true;
  $scope.createTask = function(){
    $scope.showAddTask = true;
  }

}]);

