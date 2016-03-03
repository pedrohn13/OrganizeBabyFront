(function () {

    angular
        .module('users')
        .controller('CuidadorListController',
            ['$http', '$location', '$mdDialog', CuidadorListController]);

    function CuidadorListController($http, $location, $mdDialog) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;
        var selectedUser;

        self.cuidadores = [];
        self.deleting = false;

        self.cadastrar = cadastrar;
        self.showItem = showItem;

        $http({
            method: "GET",
            url: root + '/cuidadora.json'
        }).then(function mySucces(response) {
            self.cuidadores = response.data.content;
        }, function myError(response) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Erro ao carregar lista de Cuidadores')
                    .textContent('Provavelmente erro de conexão, tente novamente mais tarde.')
                    .ariaLabel('Erro ao carregar')
                    .ok('OK')
            );
        });

        function cadastrar() {
            $location.path('cuidador.cadastro');
        }

        function showItem(ev, item) {
            selectedUser = item;
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'src/cuidador/view/cuidador-dialog.html',
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
                  .title('Você quer realmente apagar esse cuidador?')
                  .textContent('Todos os dados dele serão perdidos.')
                  .targetEvent(ev)
                  .ok('OK')
                  .cancel('CANCELAR');

                $mdDialog.show(confirm).then(function() {
                    self.deleting = true;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Removendo Cuidador')
                            .textContent('Aguarde...')
                    );
                    $http({
                        method: "DELETE",
                        url: root + '/cuidadora/' + selectedUser.id
                    }).then(function mySucces(response) {
                        self.deleting = false;
                        var index = self.cuidadores.indexOf(selectedUser);
                        self.cuidadores.splice(index, 1);
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Cuidador removido com Sucesso!')
                            .ok('OK')
                        );
                    }, function myError(response) {
                        self.deleting = false;
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
                });
            }

            function editar(ev) {
                var confirm = $mdDialog.confirm()
                    .title('Você quer realmente editar esse cuidador?')
                    .targetEvent(ev)
                    .ok('OK')
                    .cancel('CANCELAR');

                $mdDialog.show(confirm).then(function() {
                    $location.path('cuidador.edit/' + selectedUser.id);
                }, function() {
                });
            }
        }
    }

})();
