(function () {

  angular
    .module('users')
    .controller('ResponsavelListController',
      ['$http', '$location', ResponsavelListController]);

  function ResponsavelListController($http, $location) {
    var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
    var self = this;
    self.responsaveis = [];
    self.goToPerson = goToPerson;
    self.cadastrar = cadastrar;

    $http({
      method: "GET",
      url: root + '/pais.json'
    }).then(function mySucces(response) {
      self.responsaveis = response.data.content;
    }, function myError(response) {
    });

    function goToPerson(id) {
    }

    function cadastrar() {
      $location.path('responsavel.cadastro');
    }
  }

})();
