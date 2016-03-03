(function () {

    angular
        .module('users')
        .controller('CuidadorCreateController',
            ['$http', '$location', '$mdDialog', CuidadorCreateController]);

    function CuidadorCreateController($http, $location, $mdDialog) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;

        self.novoCuid = {idbercario: 1};
        self.loading = false;

        self.create = create;
        self.disableCreateButton = disableCreateButton;

        function disableCreateButton() {
            return isEmptyValue(self.novoCuid.c_nome) ||
                isEmptyValue(self.novoCuid.p_cpf);
        }

        function isEmptyValue(value) {
            return (value === '') || (value === undefined);
        }

        function create(ev) {
            var confirm = $mdDialog.confirm()
                .title('Salvar dados do Cuidador?')
                .textContent('Os dados cadastrados serão persistidos no sistema.')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCELAR');

            $mdDialog.show(confirm).then(function () {
                self.loading = true;
                $http({
                    method: "POST",
                    url: root + '/cuidadora.join',
                    data: self.novoCuid
                }).then(function mySucces(response) {
                    self.loading = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Cuidador Criado com Sucesso!')
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
