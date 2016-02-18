(function () {

    angular
        .module('users')
        .controller('CuidadorListController',
            ['$http', '$location', CuidadorListController]);

    function CuidadorListController($http, $location) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;
        self.cuidadores = [];
        self.goToPerson = goToPerson;
        self.cadastrar = cadastrar;

        $http({
            method: "GET",
            url: root + '/cuidadora.json'
        }).then(function mySucces(response) {
            self.cuidadores = response.data.content;
            console.log(self.cuidadores)
        }, function myError(response) {
            //incluir dialog
        });

        function goToPerson(id) {
        }

        function cadastrar() {
            $location.path('cuidador.cadastro');
        }
    }

})();
