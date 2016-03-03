(function () {
    'use strict';

    // Prepare the 'responsavel' module for subsequent registration of controllers and delegates
    angular.module('users', ['ngMaterial', 'ngRoute', 'ngMdIcons'])

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
                when('/responsavel.edit/:id', {
                    templateUrl: 'src/responsavel/view/responsavel-edit.html',
                    controller: 'ResponsavelEditController as respEditCtrl'
                }).
                when('/cuidador.list', {
                    templateUrl: 'src/cuidador/view/cuidador-list.html',
                    controller: 'CuidadorListController as cuidCtrl'
                }).
                when('/cuidador.cadastro', {
                    templateUrl: 'src/cuidador/view/cuidador-create.html',
                    controller: 'CuidadorCreateController as cuidCreateCtrl'
                }).
                when('/cuidador.edit/:id', {
                    templateUrl: 'src/cuidador/view/cuidador-edit.html',
                    controller: 'CuidadorEditController as cuidEditCtrl'
                }).
                when('/bebe.list', {
                    templateUrl: 'src/bebe/view/bebe-list.html',
                    controller: 'BebeListController as bbLCtrl'
                }).
                when('/bebe.cadastro', {
                    templateUrl: 'src/bebe/view/bebe-create.html',
                    controller: 'BebeCreateController as bbCreateCtrl'
                }).
                when('/bebe.edit/:id', {
                    templateUrl: 'src/bebe/view/bebe-edit.html',
                    controller: 'BebeEditController as bbEditCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
            }]);
    ;


})();
