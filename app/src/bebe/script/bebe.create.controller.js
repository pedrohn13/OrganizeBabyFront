(function () {

    angular
        .module('users')
        .controller('BebeCreateController',
            ['$http', '$location', '$mdDialog', BebeCreateController]);

    function BebeCreateController($http, $location, $mdDialog) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;

        self.loading = false;
        self.selectedResp = null;
        self.novoBB = {
            idbercario: 1,
            idresponsavel2: 2,
        };

        self.create = create;
        self.disableCreateButton = disableCreateButton;

        function disableCreateButton() {
            return isEmptyValue(self.novoBB.b_nome) ||
                isEmptyValue(self.novoBB.b_sexo) ||
                isEmptyValue(self.novoBB.b_naturalidade) ||
                isEmptyValue(self.selectedResp);
        }

        function isEmptyValue(value) {
            return (value === '') || (value === undefined) || (value === null);
        }

        $http({
            method: "GET",
            url: root + '/pais.json'
        }).then(function mySucces(response) {
            self.responsaveis = response.data.content;
        }, function myError(response) {
        });

        function create(ev) {
            self.novoBB.idresponsavel1 = self.selectedResp.id;
            var confirm = $mdDialog.confirm()
                .title('Salvar dados do Bebê?')
                .textContent('Os dados cadastrados serão persistidos no sistema.')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCELAR');

            $mdDialog.show(confirm).then(function () {
                self.loading = true;
                $http({
                    method: "POST",
                    url: root + '/bebe.join',
                    data: self.novoBB
                }).then(function mySucces(response) {
                    self.loading = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Bebê Criado com Sucesso!')
                            .ariaLabel('Erro ao carregar')
                            .ok('OK')
                    );
                    $location.path('bebe.list');
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

        self.querySearch = function (searchText) {
            var results = searchText ? self.responsaveis.filter(createFilterFor(searchText)) : [];
            return results;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(text) {
                var lowercaseText = angular.lowercase(text.p_nome);
                return (lowercaseText.indexOf(lowercaseQuery) === 0);
            };
        }

    }

})();
