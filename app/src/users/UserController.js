(function () {

  angular
    .module('users')
    .controller('UserController', [
      'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
      UserController
    ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController(userService, $mdSidenav, $mdBottomSheet, $log, $http) {
    var self = this;
    var root = 'https://leonardoads.pythonanywhere.com/OrganizeBaby/default/api';

    self.selected = null;
    self.users = [];
    self.teste = "NAO INICIADO";
    self.selectUser = selectUser;
    self.toggleList = toggleUsersList;
    self.makeContact = makeContact;
    self.fakepost = fakepost;

    // Load all registered users

    userService
      .loadAllUsers()
      .then(function (users) {
        self.users = [].concat(users);
        self.selected = users[0];
      });

    // *********************************
    // Internal methods
    // *********************************

      $http({
        method: "GET",
        url: root + '/pais.json',
      }).then(function mySucces(response) {
        self.teste = response.data.content;
      }, function myError(response) {
      });

    function fakepost() {
      $http({
        method: "POST",
        url: root + '/pais.json',
      }).then(function mySucces(response) {
        console.log(response.data)
      }, function myError(response) {
      });
    }

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser(user) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

      $mdBottomSheet.show({
        controllerAs: "cp",
        templateUrl: './src/users/view/contactSheet.html',
        controller: ['$mdBottomSheet', ContactSheetController],
        parent: angular.element(document.getElementById('content'))
      }).then(function (clickedItem) {
        $log.debug(clickedItem.name + ' clicked!');
      });

      /**
       * User ContactSheet controller
       */
      function ContactSheetController($mdBottomSheet) {
        this.user = selectedUser;
        this.actions = [
          {name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg'},
          {name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg'},
          {name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg'},
          {name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg'}
        ];
        this.contactUser = function (action) {
          // The actually contact process has not been implemented...
          // so just hide the bottomSheet

          $mdBottomSheet.hide(action);
        };
      }
    }

  }

})();
