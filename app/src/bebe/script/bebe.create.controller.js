(function () {

    angular
        .module('users')
        .controller('BebeCreateController',
            ['$http', '$location', BebeCreateController]);

    function BebeCreateController($http, $location) {
        var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
        var self = this;
        self.create = create;
        self.novoBB = {idbercario: 1,
                      idresponsavel2: 2,
                      idresponsavel1: 1};
        $http({
            method: "GET",
            url: root + '/pais.json'
        }).then(function mySucces(response) {
            self.responsaveis = response.data.content;
            console.log(self.responsaveis)
        }, function myError(response) {
            console.log(response)
        });

        function create() {
            $http({
                method: "POST",
                url: root + '/bebe.join',
                data: self.novoBB
            }).then(function mySucces(response) {
                $location.path('bebe.list');
            }, function myError(response) {
                console.log('fail')
            });
        }

        self.querySearch = function(){
          return $http({
              method: "GET",
              url: root + '/pais.json'
              }).then(function mySucces(response) {
                  console.log(self.responsaveis)
                  return response.data.content;
              }, function myError(response) {
                  console.log(response)
                  return {};
              });
          }

    }

})();
