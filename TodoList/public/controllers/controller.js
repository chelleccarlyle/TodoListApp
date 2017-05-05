var myApp = angular.module('myApp', []);

//IN LA!!!
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

     var refresh = function() {

        console.log("Message from controller");

        $http.get('/todos').then(function(response) {
            console.log("Got data!");
            $scope.todos = response.data;
        });

    };

    //Page first opens
    refresh();

    //HTML has access to scope
    $scope.addTodo = function(){
        //Set the todo's status to 'Not Done' by default
        $scope.todo.status = "Not Done"; 
    	console.log($scope.todo);       
        $http.post('/todos', $scope.todo).then(function(response){
            console.log(response);
            refresh(); //Update info of table
        });
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/todos/' + id).then(function(response){
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log("id: " + id);
        $http.get('/todos/' + id).then(function(response) {
            $scope.todo = response.data;
            console.log($scope.todo);
        });
    };

    $scope.mark = function(id) {
        console.log("id: " + id);
        $http.post('/todos/' + id).then(function(response) {
            refresh();
        });
    }

    $scope.update = function() {
        console.log($scope.todo._id);
        $http.put('/todos/' + $scope.todo._id, $scope.todo).then(function(response){
            refresh();
        });
    };

    $scope.deselect = function() {
        $scope.todo.title = ""; //Clears input
        $scope.todo.text = ""; //Clears input
        $scope.todo.due = ""; //Clears input
    };

}]);