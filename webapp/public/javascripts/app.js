var routerApp = angular.module('loveTask', ['ui.router', 'TaskListModule', 'DirectiveModule', 'postTaskService']);

routerApp.run(function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});

routerApp.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/choose');

  $stateProvider
    .state('choose', {
      url: '/choose',
      templateUrl: './chooseGender.html'
    })
    .state('app', {
      url: '/app/:type',
      templateUrl: './app.html'
    });
});
