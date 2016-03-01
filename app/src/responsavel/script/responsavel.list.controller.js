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
      $mdDialog.show(
          $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Erro ao carregar lista de Responsáveis')
              .textContent('Provavelmente erro de conexão, tente novamente mais tarde.')
              .ariaLabel('Erro ao carregar')
              .ok('OK')
      );
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
      $scope.editar = editar;

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
            url: root + '/pais/' + selectedUser.id
          }).then(function mySucces(response) {
            var index = self.responsaveis.indexOf(selectedUser);
            self.responsaveis.splice(index, 1);
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Reponsável removido com Sucesso!')
                .ok('OK')
            );
          }, function myError(response) {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Erro ao realizar operação')
                .textContent('Provavelmente erro de conexão, tente novamente mais tarde.')
                .ariaLabel('Erro ao carregar')
                .ok('OK')
            );
          });
        }, function() {
          console.log('cancelou')
        });
      }

      function editar(ev) {
        var confirm = $mdDialog.confirm()
            .title('Você quer realmente editar esse responsável?')
            .targetEvent(ev)
            .ok('OK')
            .cancel('CANCELAR');

        $mdDialog.show(confirm).then(function() {
          console.log('apagou')
        }, function() {
          console.log('cancelou')
        });
      }
    }
  }

})();
