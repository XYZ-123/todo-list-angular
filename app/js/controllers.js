//Controllers
var todoAppControllers = angular.module('todoAppControllers', ['ngStorage']);

todoAppControllers.controller("todoListCtrl",['$scope','$localStorage',function($scope,$localStorage)
{
		$localStorage.todos = [];
		$localStorage.todos[1] = {id:1,title:"Hello I am first",importance:1, status:0};
		$localStorage.todos[2] = {id:2,title:"Hello I am second",importance:2, status:0.3};
		
		$scope.todos = $localStorage.todos;
		$scope.addTodo = function(todo)
		{
			$localStorage.todos[todo.id] = todo;
		}
		
		$scope.removeTodo = function(todo)
		{
			$localStorage.todos.splice(todo.id, 1);
		}
}]);
