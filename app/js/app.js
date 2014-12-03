'use strict';

// Declare app level module which depends on views, and components
var todoApp = angular.module('todoApp', ['ngRoute', 'todoAppControllers', 'todoAppDirectives']);

todoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when("/todo",{templateUrl:"partials/todo-list.html",controller:"todoListCtrl"})
  .when("/todo/:todoId",{templateUrl:"partials/todo-details.html",controller:"todoDetailsCtrl"})
  .when("/todo/active",{templateUrl:"partials/todo-details.html",controller:"todoActiveDetailsCtrl"})
  .when("/todo/completed",{templateUrl:"partials/todo-list.html",controller:"todoListCtrl"})
  .otherwise({redirectTo: '/todo'});
}]);
