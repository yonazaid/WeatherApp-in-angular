//module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);
//Route
weatherApp.config(function($routeProvider){
  $routeProvider
  .when('/',{
       templateUrl:'pages/home.html',
       controller:'homeController'

  })
  .when('/forecast',{
    templateUrl:'pages/forcast.html',
    controller:'forecastController'
  })
  .when('/forecast/:days',{
    templateUrl:'pages/forcast.html',
    controller:'forecastController'
  })
});
//custom service
weatherApp.service('cityService',function(){
    this.city="New York, NY";
});
//controller
weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){
  $scope.city=cityService.city;
  $scope.$watch('city',function(){
    cityService.city=$scope.city;
  });

}]);

weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams,cityService){
   $scope.city=cityService.city;
   $scope.days=$routeParams.days || 2;
   $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?appid=e5c9e8ff983d8480ba81e721d261d7ec" , { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city,cnt:$scope.days});
   //console.log(  $scope.weatherResult);
   $scope.convertToFahrenheit = function(degK){
      return Math.round((1.8*((degK*1)-273))+32);
   };
   $scope.convertToDate=function(dt){
     return new Date(dt*1000);
   }
}]);
