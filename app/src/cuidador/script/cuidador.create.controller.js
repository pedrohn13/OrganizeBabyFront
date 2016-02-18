(function () {

    angular
        .module('users')
        .controller('CuidadorCreateController',
            ['$http', '$location', CuidadorCreateController]);

    function CuidadorCreateController($http, $location) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;
        self.create = create;
        self.novoCuid = {idbercario: 1};

        function create() {
            $http({
                method: "POST",
                url: root + '/cuidadora.join',
                data: self.novoCuid
            }).then(function mySucces(response) {
                $location.path('cuidador.list');
            }, function myError(response) {
            });
        }

    }

})();
