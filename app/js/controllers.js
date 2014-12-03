//Controllers
var todoAppControllers = angular.module('todoAppControllers', ['ngStorage']);

todoAppControllers.controller("todoListCtrl",['$scope','$localStorage',function($scope,$localStorage)
{
		$localStorage.todos = $localStorage.todos || {};
		//$localStorage.todos = {};
		//$localStorage.todos["0"] = {id:0,inEditingMode:false, title:"Hello I am first",importance:1, status:0, toggleEdit:"toggleEditMode(0)", remove:"removeTodo(0)", 
		//						subTodos:{}};
		//$localStorage.todos["1"] = {id:1,inEditingMode:false, title:"Hello I am second",importance:2, status:0.6, toggleEdit:"toggleEditMode(1)", remove:"removeTodo(1)", subTodos:{}};
		//$localStorage.todos["2"] = {id:2,inEditingMode:false,title:"Hello I am second",importance:3, status:1, toggleEdit:"toggleEditMode(2)", remove:"removeTodo(2)", subTodos:{}};
		//$localStorage.todos["0"].subTodos[0] = {id:0,inEditingMode:false, title:"Hello I am first subTodo", importance: 1, done:false, completeTodo:"completeTodo(0)",toggleEdit:"toggleEditMode(0)", remove:"removeSubTodo(0)"};
		//$localStorage.todos["0"].subTodos[1] = {id:1,inEditingMode:false, title:"Hello I am second subTodo", importance: 1, done:true,completeTodo:"completeTodo(1)", toggleEdit:"toggleEditMode(1)", remove:"removeSubTodo(1)"}
		$scope.todos = $localStorage.todos;
		//console.log($scope.todos);
		$scope.addTodo = function(todoTitle)
		{
			var nextId = Object.keys($scope.todos).length;
			$scope.todos[nextId] = {id:nextId,inEditingMode:false, title:todoTitle, importance: 1, status:0,toggleEdit:"toggleEditMode("+nextId+")", remove:"removeTodo("+nextId+")",subTodos:{}};
			$scope.todoTitle = "";
		}
		
		$scope.removeTodo = function(id)
		{
			console.log($scope.todos);
			//$scope.todos.splice(id, 1);
			delete $scope.todos[id];
			console.log($scope.todos);
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
			$scope.todos[id].inEditingMode = !$scope.todos[id.toString()].inEditingMode ;
		}
		$scope.status = function(id)
		{
			var amount = 0;
			var completed = 0;
			for (var key in $scope.todos[id].subTodos)
			{
				if($scope.todos[id].subTodos[key])
				{
					amount++;
					completed += $scope.todos[id].subTodos[key].done ? 1:0;
				}
			}
			if (amount == 0)
				return 0;
			return Number((completed/amount).toFixed(2));
		}
}]);

todoAppControllers.controller("todoDetailsCtrl",['$scope','$localStorage','$routeParams',function($scope, $localStorage, $routeParams)
{
	 $scope.todo = $localStorage.todos[$routeParams.todoId];
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
	$scope.addSubTodo = function()
	{
		for(var key in $scope.todo.subTodos)
		{
			if($scope.todo.subTodos[key].inEditingMode)
				return;
		}
		var nextId = Object.keys($scope.todo.subTodos).length;
		$scope.todo.subTodos[nextId] = {id:nextId, inEditingMode:true, title:"", done:false,completeTodo:"completeTodo("+nextId+")",toggleEdit:"toggleEditMode("+nextId+")", remove:"removeSubTodo("+nextId+")"};
	}
	$scope.removeSubTodo = function(id)
		{
			delete $scope.todo.subTodos[id];
		}
}]);

