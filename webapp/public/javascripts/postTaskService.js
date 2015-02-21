var postService = angular.module('postTaskService', []);

postService.service('PostTask', function($http){
  this.saveTask = function(url, newTask){
    return $http.post(url, {task: newTask})
  }
});
