(function () {

    angular
        .module('users')
        .controller('ResponsavelCreateController',
            ['$http', '$location', '$mdDialog', ResponsavelCreateController]);

    function ResponsavelCreateController($http, $location, $mdDialog) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;

        self.checkSenha = '';
        self.novoResp = {};
        self.loading = false;

        self.create = create;
        self.disableCreateButton = disableCreateButton;

        function disableCreateButton() {
            return isEmptyValue(self.novoResp.p_nome) ||
                isEmptyValue(self.novoResp.p_cpf) ||
                isEmptyValue(self.novoResp.p_telefone) ||
                isEmptyValue(self.novoResp.p_senha) ||
                isEmptyValue(self.checkSenha);
        }

        function isEmptyValue(value) {
            return (value === '') || (value == undefined);
        }

        function create(ev) {
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
                        method: "POST",
                        url: root + '/pais.join',
                        data: self.novoResp
                    }).then(function mySucces(response) {
                        self.loading = false;
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Responsável Criado com Sucesso!')
                                .ariaLabel('Erro ao carregar')
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
