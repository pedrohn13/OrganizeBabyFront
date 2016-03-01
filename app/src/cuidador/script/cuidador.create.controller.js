(function () {

    angular
        .module('users')
        .controller('CuidadorCreateController',
            ['$http', '$location', '$mdDialog', CuidadorCreateController]);

    function CuidadorCreateController($http, $location,$mdDialog) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;
        self.create = create;
        self.novoCuid = {idbercario: 1};

        function create(ev) {
            var confirm = $mdDialog.confirm()
                .title('Salvar dados do Cuidador?')
                .textContent('Os dados cadastrados serão persistidos no sistema.')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCELAR');

            $mdDialog.show(confirm).then(function() {
                $http({
                    method: "POST",
                    url: root + '/cuidadora.join',
                    data: self.novoCuid
                }).then(function mySucces(response) {
                    $location.path('cuidador.list');
                }, function myError(response) {
                });
            }, function() {
            });
        }

    }

})();
