(function() {
  'use strict';

  angular.module('taskstack', ['ngRoute', 'ngAnimate']);

  angular.module('taskstack')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'stack.html',
        controller: 'Main',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'about.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  angular.module('taskstack')
    .controller('Main', Main);

  Main.$inject = ['$window'];

  function Main($window) {
    var vm = this;
    activate();

    function activate() {
      vm.stack = [];
      vm.newTask = '';
      vm.push = push;
      vm.pop = pop;
      vm.keypress = keypress;
      load();
    }

    function push() {
      if (vm.newTask) {
        vm.stack.push({
          name: vm.newTask
        });
        vm.newTask = '';
        save();
      }
    }

    function pop() {
      vm.stack.pop();
      save();
    }

    function keypress(event) {
      if (event.keyCode === 13) {
        vm.push();
      } else if (event.keyCode === 27) {
        vm.pop();
      }
    }

    function save() {
      $window.localStorage.setItem('stack', angular.toJson(vm.stack));
    }

    function load() {
      if ($window.localStorage.getItem('stack')) {
        vm.stack = angular.fromJson($window.localStorage.getItem('stack'));
      }
    }
  }
})();