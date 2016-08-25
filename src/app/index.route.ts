/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'app/addRole/add.html',
      controller: 'addController',
      controllerAs: 'addCtrl'
    })
    .state('edit', {
      url: '/edit/:id',
      templateUrl: 'app/editRole/edit.html',
      controller: 'editController',
      controllerAs: 'editCtrl'
    });
  $urlRouterProvider.otherwise('/');
}
