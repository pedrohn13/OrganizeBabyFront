(function () {

    angular
        .module('users')
        .controller('BebeListController',
            ['$http', '$location', '$mdDialog', BebeListController]);

    function BebeListController($http, $location, $mdDialog) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;
        var selectedUser;
        self.bebe = [];
        self.cadastrar = cadastrar;
        self.showItem = showItem;

        $http({
            method: "GET",
            url: root + '/bebe.json'
        }).then(function mySucces(response) {
            self.bebe = response.data.content;
        }, function myError(response) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Erro ao carregar lista de Bebês')
                    .textContent('Provavelmente erro de conexão, tente novamente mais tarde.')
                    .ariaLabel('Erro ao carregar')
                    .ok('OK')
            );
        });

        function cadastrar() {
            $location.path('bebe.cadastro');
        }

        function showItem(ev, item) {
            selectedUser = item;
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'src/bebe/view/bebe-dialog.html',
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

            if (selectedUser.b_sexo == 'm') {
                $scope.user.b_sexo = 'Masculino';
            } else {
                $scope.user.b_sexo = 'Feminino';
            }

            function remover(ev) {
                var confirm = $mdDialog.confirm()
                  .title('Você quer realmente apagar esse bebê?')
                  .textContent('Todos os dados dele serão perdidos.')
                  .targetEvent(ev)
                  .ok('OK')
                  .cancel('CANCELAR');

                $mdDialog.show(confirm).then(function() {
                    $http({
                        method: "DELETE",
                        url: root + '/bebe/' + selectedUser.id
                    }).then(function mySucces(response) {
                        var index = self.bebe.indexOf(selectedUser);
                        self.bebe.splice(index, 1);
                        $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Bebê removido com Sucesso!')
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
                    .title('Você quer realmente editar esse bebê?')
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
