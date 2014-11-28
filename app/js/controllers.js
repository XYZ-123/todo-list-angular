//Controllers
var todoAppControllers = angular.module('todoAppControllers', ['ngStorage']);

todoAppControllers.controller("todoListCtrl",['$scope','$localStorage',function($scope,$localStorage)
{
		$localStorage.todos = [];
		$localStorage.todos[0] = {id:0,title:"Hello I am first",importance:1, status:0, click:"editTodo(0)"};
		$localStorage.todos[1] = {id:1,title:"Hello I am second",importance:2, status:0.3, click:"editTodo(1)"};

		$scope.todos = $localStorage.todos;
		
		$scope.addTodo = function(todoTitle)
		{
			var nextId = $scope.todos.length;
			$scope.todos[nextId] = {id:nextId,title:todoTitle, importance: 0, status:0,click:"editTodo("+nextId+")"};
		}
		
		$scope.removeTodo = function(todo)
		{
			$scope.todos.splice(todo.id, 1);
		}
		$scope.getProp = function(prop, obj)
		{
			return $scope.$eval(prop, obj);
		}
		$scope.editTodo = function(id)
		{
			$scope.todos[id].title = "Edited!";
		}
}]);
