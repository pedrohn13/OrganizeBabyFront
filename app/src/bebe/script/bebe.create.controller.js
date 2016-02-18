(function () {

  angular
    .module('users')
    .controller('BebeCreateController',
      ['$http', '$location', BebeCreateController]);

  function BebeCreateController($http, $location) {
    var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';
    var self = this;
    self.create = create;
    self.novoBB = {
      idbercario: 1,
      idresponsavel2: 2,
    };

    $http({
      method: "GET",
      url: root + '/pais.json'
    }).then(function mySucces(response) {
      self.responsaveis = response.data.content;
    }, function myError(response) {
    });

    function create() {
      self.novoBB.idresponsavel1 = self.selectedResp.id;
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
