//Controllers
var todoAppControllers = angular.module('todoAppControllers', ['ngStorage']);

todoAppControllers.controller("todoListCtrl",['$scope','$localStorage',function($scope,$localStorage)
{
		$localStorage.todos = [];
		$localStorage.todos[0] = {id:0,inEditingMode:false,isEditing: "isEditing(0)", title:"Hello I am first",importance:1, status:0, edit:"editTodo(0)", remove:"removeTodo(0)"};
		$localStorage.todos[1] = {id:1,inEditingMode:false,isEditing: "isEditing(1)", title:"Hello I am second",importance:2, status:0.3, edit:"editTodo(1)", remove:"removeTodo(1)"};

		$scope.todos = $localStorage.todos;
		
		$scope.addTodo = function(todoTitle)
		{
			var nextId = $scope.todos.length;
			$scope.todos[nextId] = {id:nextId,inEditingMode:false,isEditing: "isEditing("+nextId+")",title:todoTitle, importance: 0, status:0,edit:"editTodo("+nextId+")", remove:"removeTodo("+nextId+")"};
			$scope.todoTitle = "";
		}
		
		$scope.removeTodo = function(id)
		{
			$scope.todos.splice(id, 1);
		}
		
		$scope.updateTodo = function(id, title)
		{
			$scope.todos[id].title = title;
			$scope.todos[id].inEditingMode = false;
		}
		$scope.getProp = function(prop, obj)
		{
			return $scope.$eval(prop, obj);
		}
		
		$scope.isEditing = function(id)
		{
			return $scope.todos[id].inEditingMode;
		}
		$scope.editTodo = function(id)
		{
			$scope.todos[id].inEditingMode = !$scope.todos[id].inEditingMode ;
		}
}]);
