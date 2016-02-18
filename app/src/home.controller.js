(function () {

  angular
    .module('users')
    .controller('HomeController',
      ['userService', '$mdSidenav', '$location',
        HomeController]);

  function HomeController(userService, $mdSidenav, $location) {
    var self = this;

    self.selected = null;
    self.users = [];
    self.selectUser = selectUser;
    self.toggleList = toggleUsersList;

    // Load all registered responsavel

    userService
      .loadAllUsers()
      .then(function (users) {
        self.users = [].concat(users);
      });

    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    function selectUser(view) {
      $location.path(view);
    }

  }

})();
