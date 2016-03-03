(function () {

    angular
        .module('users')
        .controller('CuidadorEditController',
            ['$http', '$location', '$mdDialog', '$routeParams', CuidadorEditController]);

    function CuidadorEditController($http, $location, $mdDialog, $routeParams) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;

        self.novoCuid = {};
        self.loading = false;

        self.edit = edit;
        self.disableEditButton = disableEditButton;

        getCuidador();

        function getCuidador() {
            $http({
                method: "GET",
                url: root + '/cuidadora/id/' + $routeParams.id + '.json'
            }).then(function mySucces(response) {
                self.novoCuid = response.data.content[0];
            }, function myError(response) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Erro ao carregar cuidador')
                        .textContent('Provavelmente erro de conexão, tente novamente mais tarde.')
                        .ariaLabel('Erro ao carregar')
                        .ok('OK')
                );
            });
        }

        function disableEditButton() {
            return isEmptyValue(self.novoCuid.c_nome) ||
                isEmptyValue(self.novoCuid.p_cpf);
        }

        function isEmptyValue(value) {
            return (value === '') || (value === undefined);
        }

        function edit(ev) {
            var confirm = $mdDialog.confirm()
                .title('Salvar dados do Cuidador?')
                .textContent('Os dados cadastrados serão persistidos no sistema.')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCELAR');

            $mdDialog.show(confirm).then(function () {
                self.loading = true;
                $http({
                    method: "PUT",
                    url: root + '/cuidadora/' + self.novoCuid.id,
                    data: self.novoCuid
                }).then(function mySucces(response) {
                    self.loading = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Cuidador Editado com Sucesso!')
                            .ariaLabel('Erro ao carregar')
                            .ok('OK')
                    );
                    $location.path('cuidador.list');
                }, function myError(response) {
                    self.loading = false;
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
            }, function () {
            });
        }

    }

})();
