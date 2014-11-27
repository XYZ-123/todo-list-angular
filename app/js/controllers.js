//Controllers
var todoAppControllers = angular.module('todoAppControllers', ['ngStorage']);

todoAppControllers.controller("todoListCtrl",['$scope','$localStorage',function($scope,$localStorage)
{
		$localStorage.todos = [];
		$localStorage.todos[0] = {id:0,title:"Hello I am first",importance:1, status:0, click:"editTodo(0)"};
		$localStorage.todos[1] = {id:1,title:"Hello I am second",importance:2, status:0.3, click:"editTodo(1)"};

		$scope.todos = $localStorage.todos;
		$scope.addTodo = function(todo)
		{
			$localStorage.todos[todo.id] = todo;
		}
		
		$scope.removeTodo = function(todo)
		{
			$localStorage.todos.splice(todo.id, 1);
		}
		$scope.getProp = function(prop, obj)
		{
			return $scope.$eval(prop, obj);
		}
		$scope.editTodo = function(id)
		{
			$localStorage.todos[id].title = "Edited!";
		}
}]);
