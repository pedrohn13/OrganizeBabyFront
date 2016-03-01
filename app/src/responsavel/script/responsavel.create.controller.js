(function () {

  angular
    .module('users')
    .controller('ResponsavelCreateController',
      ['$http', '$location', '$mdDialog', ResponsavelCreateController]);

  function ResponsavelCreateController($http, $location, $mdDialog) {
    var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
    var self = this;
    self.create = create;
    self.novoResp = {};

    function create(ev) {
      var confirm = $mdDialog.confirm()
          .title('Salvar dados do Responsável?')
          .textContent('Os dados cadastrados serão persistidos no sistema.')
          .targetEvent(ev)
          .ok('OK')
          .cancel('CANCELAR');

      $mdDialog.show(confirm).then(function() {
        $http({
          method: "POST",
          url: root + '/pais.join',
          data: self.novoResp
        }).then(function mySucces(response) {
          $location.path('responsavel.list');
        }, function myError(response) {
        });
      }, function() {
      });
    }

  }

})();
