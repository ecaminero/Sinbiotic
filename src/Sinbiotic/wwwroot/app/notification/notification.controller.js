(function() {
  'use strict';

  angular
    .module('app.notification')
    .controller('notificationController', notificationController);
 
 /* @ngInject */
  function notificationController($log) {
    var vm = this;
    vm.title = 'notificationController';

    activate();
    function activate() {
      $log.info("notificationController");
    }
  }
})();
