(function() {
  'use strict';

  angular
    .module('app.notification')
    .controller('notificationController', notificationController);

  function notificationController($log) {
    var vm = this;
    vm.title = 'notificationController';

    activate();
    function activate() {
      $log.info("notificationController");
    }
  }
  notificationController.$inject = ['$log'];
})();
