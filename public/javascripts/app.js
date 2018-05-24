var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm"
    })
    .when("/home", {
        templateUrl : "views/partial-home.html"
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
});

app.controller('myController',function($scope,$window, $http){
    console.log("Hi");
    $scope.visible = true;
    getData = function () {
        var request = $http.get('/getAllEmpList');    
        request.success(function(data) {
            console.log(data);
            return $scope.data = data.data;
        });
        request.error(function(data){
            console.log('Error: ' + data);
        });    
    }
    getData();
    $scope.addData = function () {
        console.log("posting data....");
        console.log($scope.employee);
        var res = $http.post('/createEmployee',$scope.employee);
		res.success(function(data, status, headers, config) {
			console.log("success");
			getData();
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
        
    }

    $scope.editData = function (id) {
        $scope.visible = false;
        console.log(id);
        $scope.data;
        var test = {id:id}
        var res = $http.post('/getEmp',test);
		res.success(function(data, status, headers, config) {
            console.log(data)
            $scope.employee = data.data[0];
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
    }

    $scope.updateData = function (id) {
        $http.put('/updateEmp',$scope.employee).then(function (response) {
            getData();
            console.log(response)
        }, function (response) {
            console.log(response);
        });
    }

    $scope.deleteData = function (id) {
        console.log(id);
        
        $http.delete('/deleteEmp?id='+id).then(function (response) {
            getData();
            console.log(response)
        }, function (response) {
            console.log(response);
        });
    }

    
    


    
    //console.log($scope.employee);
});


