var app = angular.module("shop", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/customers", {
        controller : "clientController",
        templateUrl : "/client/list.htm"
    })
    .when("/newClient", {
        controller : "clientController",
        templateUrl : "/client/form.htm"
    })
    .when("/editClient/:id", {
        controller : "clientController",
        templateUrl : "/client/form.htm"
    });
});