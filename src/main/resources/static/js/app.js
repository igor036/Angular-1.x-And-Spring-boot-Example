var app = angular.module("shop", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    
    //client
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
    })
    
    //provider
    .when("/providers", {
        controller : "providerController",
        templateUrl : "/provider/list.htm"
    })
    .when("/newProvider", {
        controller : "providerController",
        templateUrl : "/provider/form.htm"
    })
    .when("/editProvider/:id", {
        controller : "providerController",
        templateUrl : "/provider/form.htm"
    })
    
    //book
    .when("/books", {
        controller : "bookController",
        templateUrl : "/book/list.htm"
    })
    .when("/newBook", {
        controller : "bookController",
        templateUrl : "/book/form.htm"
    })
    .when("/editBook/:id", {
        controller : "bookController",
        templateUrl : "/book/form.htm"
    });
    
});