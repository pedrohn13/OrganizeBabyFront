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
                    $http({
                        method: "DELETE",
                        url: root + '/cuidadora/' + selectedUser.id
                    }).then(function mySucces(response) {
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
                    .title('Você quer realmente editar esse cuidador?')
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
