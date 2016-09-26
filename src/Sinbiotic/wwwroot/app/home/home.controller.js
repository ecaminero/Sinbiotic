(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeController', homeController);

  function homeController($log) {
    var vm = this;
    vm.title = 'homeController';

    activate();
    function activate() {
      $log.info("homeController");
    }
  }
    homeController.$inject = ['$log'];
})();
