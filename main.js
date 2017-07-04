angular.module("Buka", [])

.constant("baseURL", "http://localhost:3000")

.controller("GlobalCtrl", function($scope) {
    var tab = "homepage"; // zamiast ng-init; inicjalnie wyświetla się homepage
    $scope.isDisplayed = function(tabName) {
        return tab === tabName;
    };
    $scope.display = function(tabName) {
        tab = tabName;
    }
})

.service("BookModel", function($http, baseURL) { // ten serwis jest odpowiednikiem modelu w BUCE #1
    this.getCollection = function() {
        return $http.get(baseURL + "/books");
    }
})

.controller("HomepageCtrl", function($scope) { // $scope to ZALEŻNOŚĆ (tak, jak wszystko, co znajdzie się
    // w parametrze function w kontrolerze);
    // wszystko, co przypnę na scope staje się dostępne w widoku
    $scope.title = "Hello, book lovers";
    $scope.subtitle = "Work in progress... Stay tuned!";
})

.controller("WishListCtrl", function($scope) {
    $scope.title = "Here will be a list of book that I want to have.";
})

.controller("MyLibraryCtrl", function($scope, BookModel) { // kontroler używa serwisu, ale nie wie, JAK serwis działa
    $scope.header = "All books";
    BookModel.getCollection().then(function(response) {
        $scope.books = response.data;
    });
});
