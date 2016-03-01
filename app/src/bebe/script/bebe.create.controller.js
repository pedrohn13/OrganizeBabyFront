(function () {

  angular
    .module('users')
    .controller('BebeCreateController',
      ['$http', '$location', '$mdDialog', BebeCreateController]);

  function BebeCreateController($http, $location, $mdDialog) {
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

    function create(ev) {
      self.novoBB.idresponsavel1 = self.selectedResp.id;
      var confirm = $mdDialog.confirm()
          .title('Salvar dados do Bebê?')
          .textContent('Os dados cadastrados serão persistidos no sistema.')
          .targetEvent(ev)
          .ok('OK')
          .cancel('CANCELAR');

      $mdDialog.show(confirm).then(function() {
        $http({
          method: "POST",
          url: root + '/bebe.join',
          data: self.novoBB
        }).then(function mySucces(response) {
          $location.path('bebe.list');
        }, function myError(response) {
          console.log('fail')
        });
      }, function() {
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
