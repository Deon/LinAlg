//MathJax Configuration
MathJax.Hub.Config({
  jax: ["input/TeX", "output/HTML-CSS","output/NativeMML"],
  tex2jax:{
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ]
  }
});

var app = angular.module('linAlgApp', ['ngRoute', 'ngTouch', 'ngAnimate', 'linAlgControllers']);

app.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/',{
        templateUrl: 'partials/matrix.html',
        controller: 'MatrixController'
      }).
      when('/complex',{
        templateUrl: 'partials/complex.html'
      }).
      when('/about',{
        templateUrl: 'partials/about.html'
      }).
      otherwise({
        redirectTo: '/'
      })
}])
.animation('.reveal-animation', function() {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      element.fadeIn(500, done);
      return function() {
        element.stop();
      }
    },
    leave: function(element, done) {
      element.fadeOut(500, done);
      return function() {
        element.stop();
      }
    }
  }
});