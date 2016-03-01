(function () {

  angular
    .module('users')
    .controller('ResponsavelListController',
      ['$http', '$location', '$mdDialog', ResponsavelListController]);

  function ResponsavelListController($http, $location, $mdDialog) {
    var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
    var self = this;
    var selectedUser;
    self.responsaveis = [];
    self.cadastrar = cadastrar;
    self.showItem = showItem;

    $http({
      method: "GET",
      url: root + '/pais.json'
    }).then(function mySucces(response) {
      self.responsaveis = response.data.content;
    }, function myError(response) {
    });

    function cadastrar() {
      $location.path('responsavel.cadastro');
    }

    function showItem(ev, item) {
      selectedUser = item;
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'src/responsavel/view/responsavel-dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: false
        })
        .then(function (answer) {
        }, function () {
        });
    };

    function DialogController($scope, $mdDialog) {
      $scope.user = selectedUser;
      $scope.remover = remover;

      function remover(ev) {
        var confirm = $mdDialog.confirm()
          .title('Você quer realmente apagar esse responsável?')
          .textContent('Todos os dados dele serão perdidos.')
          .targetEvent(ev)
          .ok('OK')
          .cancel('CANCELAR');

        $mdDialog.show(confirm).then(function() {
          $http({
            method: "DELETE",
            url: root + '/pais/id/' + selectedUser.id
          }).then(function mySucces(response) {
            console.log('ok')
          }, function myError(response) {
            console.log('fail')
          });
        }, function() {
          console.log('cancelou')
        });
      }
    }
  }

})();
