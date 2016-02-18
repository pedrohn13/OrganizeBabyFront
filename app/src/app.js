(function () {
  'use strict';

  // Prepare the 'responsavel' module for subsequent registration of controllers and delegates
  angular.module('users', ['ngMaterial', 'ngRoute'])

    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.
        when('/', {
          templateUrl: 'src/home.html'
        }).
        when('/responsavel.list', {
          templateUrl: 'src/responsavel/view/responsavel-list.html',
          controller: 'ResponsavelListController as respCtrl'
        }).
        when('/responsavel.cadastro', {
          templateUrl: 'src/responsavel/view/responsavel-create.html',
          controller: 'ResponsavelCreateController as respCreateCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
      }]);
  ;


})();
