(function () {

    angular
        .module('users')
        .controller('BebeListController',
            ['$http', '$location', BebeListController]);

    function BebeListController($http, $location) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;
        self.bebe = [];
        self.goToPerson = goToPerson;
        self.cadastrar = cadastrar;

        $http({
            method: "GET",
            url: root + '/bebe.json'
        }).then(function mySucces(response) {
            self.bebe = response.data.content;
            console.log(self.bebe)
        }, function myError(response) {
            //incluir dialog
        });

        function goToPerson(id) {
        }

        function cadastrar() {
            $location.path('bebe.cadastro');
        }
    }

})();
