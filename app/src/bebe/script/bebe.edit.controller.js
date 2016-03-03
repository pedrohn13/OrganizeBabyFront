(function () {

    angular
        .module('users')
        .controller('BebeEditController',
            ['$http', '$location', '$mdDialog', '$routeParams', BebeEditController]);

    function BebeEditController($http, $location, $mdDialog, $routeParams) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;

        self.loading = false;
        self.selectedResp = null;
        self.novoBB = {};

        self.edit = edit;
        self.disableEditButton = disableEditButton;

        getBebe();

        function getBebe() {
            $http({
                method: "GET",
                url: root + '/bebe/id/' + $routeParams.id + '.json'
            }).then(function mySucces(response) {
                self.novoBB = response.data.content[0];
                getResponsavel();
            }, function myError(response) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Erro ao carregar Bebê')
                        .textContent('Provavelmente erro de conexão, tente novamente mais tarde.')
                        .ariaLabel('Erro ao carregar')
                        .ok('OK')
                );
            });
        }

        function getResponsavel() {
            $http({
                method: "GET",
                url: root + '/pais/id/' + self.novoBB.idresponsavel1 + '.json'
            }).then(function mySucces(response) {
                self.selectedResp = response.data.content[0];
            }, function myError(response) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Erro ao carregar Responsável do Bebê')
                        .textContent('Provavelmente erro de conexão, tente novamente mais tarde.')
                        .ariaLabel('Erro ao carregar')
                        .ok('OK')
                );
            });
        }

        function disableEditButton() {
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

        function edit(ev) {
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
                    method: "PUT",
                    url: root + '/bebe/' + self.novoBB.id,
                    data: self.novoBB
                }).then(function mySucces(response) {
                    self.loading = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Bebê Editado com Sucesso!')
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
