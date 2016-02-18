(function () {

  angular
    .module('users')
    .controller('ResponsavelCreateController',
      ['$http', '$location', ResponsavelListController]);

  function ResponsavelListController($http, $location) {
    var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
    var self = this;
    self.create = create;
    self.novoResp = {};

    function create() {
      $http({
        method: "POST",
        url: root + '/pais.join',
        data: self.novoResp
      }).then(function mySucces(response) {
        $location.path('responsavel.list');
      }, function myError(response) {
        console.log('fail')
      });
    }

  }

})();
