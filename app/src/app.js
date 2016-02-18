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
        when('/cuidador.list', {
          templateUrl: 'src/cuidador/view/cuidador-list.html',
          controller: 'CuidadorListController as cuidCtrl'
        }).
        when('/cuidador.cadastro', {
          templateUrl: 'src/cuidador/view/cuidador-create.html',
          controller: 'CuidadorCreateController as cuidCreateCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
      }]);
  ;


})();
