(function () {

    angular
        .module('users')
        .controller('ResponsavelEditController',
            ['$http', '$location', '$mdDialog', '$routeParams', ResponsavelEditController]);

    function ResponsavelEditController($http, $location, $mdDialog, $routeParams) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;

        self.checkSenha = '';
        self.novoResp = {};
        self.loading = false;

        self.edit = edit;
        self.disableEditButton = disableEditButton;

        getResponsavel();

        function getResponsavel() {
            $http({
                method: "GET",
                url: root + '/pais/id/' + $routeParams.id + '.json'
            }).then(function mySucces(response) {
                self.novoResp = response.data.content[0];
                self.checkSenha = self.novoResp.p_senha;
            }, function myError(response) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Erro ao carregar responsável')
                        .textContent('Provavelmente erro de conexão, tente novamente mais tarde.')
                        .ariaLabel('Erro ao carregar')
                        .ok('OK')
                );
            });
        }

        function disableEditButton() {
            return isEmptyValue(self.novoResp.p_nome) ||
                isEmptyValue(self.novoResp.p_cpf) ||
                isEmptyValue(self.novoResp.p_telefone) ||
                isEmptyValue(self.novoResp.p_senha) ||
                isEmptyValue(self.checkSenha);
        }

        function isEmptyValue(value) {
            return (value === '') || (value == undefined);
        }

        function edit(ev) {
            if (self.novoResp.p_senha !== self.checkSenha) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('As senhas não correspondem!')
                        .textContent('Corrija isso antes de salvar.')
                        .ok('OK')
                );
            } else {
                var confirm = $mdDialog.confirm()
                    .title('Salvar dados do Responsável?')
                    .textContent('Os dados cadastrados serão persistidos no sistema.')
                    .targetEvent(ev)
                    .ok('OK')
                    .cancel('CANCELAR');

                $mdDialog.show(confirm).then(function () {
                    self.loading = true;
                    $http({
                        method: "PUT",
                        url: root + '/pais/' + self.novoResp.id,
                        data: self.novoResp
                    }).then(function mySucces(response) {
                        self.loading = false;
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Responsável Editado com Sucesso!')
                                .ok('OK')
                        );
                        $location.path('responsavel.list');
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

    }

})();
