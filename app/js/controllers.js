//Controllers
var todoAppControllers = angular.module('todoAppControllers', ['ngStorage']);

todoAppControllers.controller("todoListCtrl",['$scope','$localStorage',function($scope,$localStorage)
{
		$localStorage.todos = [];
		$localStorage.todos[0] = {id:0,inEditingMode:false, title:"Hello I am first",importance:1, status:0, toggleEdit:"toggleEditMode(0)", remove:"removeTodo(0)", 
								subTodos:[{id:0,inEditingMode:false, title:"Hello I am first subTodo", importance: 1, done:false, completeTodo:"completeTodo(0)",toggleEdit:"toggleEditMode(0)", remove:"removeSubTodo(0)"},
								{id:1,inEditingMode:false, title:"Hello I am second subTodo", importance: 1, done:true,completeTodo:"completeTodo(1)", toggleEdit:"toggleEditMode(1)", remove:"removeSubTodo(1)"}]};
		$localStorage.todos[1] = {id:1,inEditingMode:false, title:"Hello I am second",importance:2, status:0.6, toggleEdit:"toggleEditMode(1)", remove:"removeTodo(1)", subTodos:[]};
		$localStorage.todos[2] = {id:2,inEditingMode:false,title:"Hello I am second",importance:3, status:1, toggleEdit:"toggleEditMode(2)", remove:"removeTodo(2)", subTodos:[]};

		$scope.todos = $localStorage.todos;
		
		$scope.addTodo = function(todoTitle)
		{
			var nextId = $scope.todos.length;
			$scope.todos[nextId] = {id:nextId,inEditingMode:false, title:todoTitle, importance: 1, status:0,toggleEdit:"toggleEditMode("+nextId+")", remove:"removeTodo("+nextId+")",subTodos:[]};
			$scope.todoTitle = "";
		}
		
		$scope.removeTodo = function(id)
		{
			$scope.todos.splice(id, 1);
		}
		
		$scope.updateTodoTitle = function(id, title)
		{
			$scope.todos[id].title = title;
			$scope.todos[id].inEditingMode = false;
		}
		$scope.updateTodoImportance = function(id, importance)
		{
			$scope.todos[id].importance = importance;
			$scope.todos[id].inEditingMode = false;
		}
		$scope.getProp = function(prop, obj)
		{
			return $scope.$eval(prop, obj);
		}
		$scope.isInEditMode = function(id)
		{
			return $scope.todos[id].inEditingMode;
		}
		$scope.toggleEditMode = function(id)
		{
			$scope.todos[id].inEditingMode = !$scope.todos[id].inEditingMode ;
		}
}]);

todoAppControllers.controller("todoDetailsCtrl",['$scope','$localStorage','$routeParams',function($scope, $localStorage, $routeParams)
{
	 $scope.todo = $localStorage.todos[$routeParams.todoId];
	 console.log($scope.todo);
	 $scope.getProp = function(prop, obj)
	{
		return $scope.$eval(prop, obj);
	}
	$scope.isInEditMode = function(id)
	{
		return $scope.todo.subTodos[id].inEditingMode;
	}  
	$scope.toggleEditMode = function(id)
	{
		$scope.todo.subTodos[id].inEditingMode = !$scope.todo.subTodos[id].inEditingMode;
	}
	$scope.updateTodoTitle = function(id, title)
	{
		$scope.todo.subTodos[id].title = title;
		$scope.todo.subTodos[id].inEditingMode = false;
	}
	$scope.updateTodoImportance = function(id, importance)
	{
		$scope.todo.subTodos[id].importance = importance;
		$scope.todo.subTodos[id].inEditingMode = false;
	}
	$scope.completeTodo = function(id)
	{
		$scope.todo.subTodos[id].done = !$scope.todo.subTodos[id].done;
	}
}]);

