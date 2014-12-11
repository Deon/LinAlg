/**
 * Created by Owner on 11/21/2014.
 */

MathJax.Hub.Config({
  jax: ["input/TeX","output/HTML-CSS","output/NativeMML"],
  tex2jax:{
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ]
  }
});

//Declare module
var app = angular.module('LinAlgToolkit', ['ui.bootstrap']);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})


app.controller('MainCtrl', function($scope, $http){

    $scope.isError = null;
    $scope.matrix = null;

    $scope.displayMatrix = function(){
        $http({
            url: '/getReducedMatrix/'
        })
            .then(function(matrix){
              $scope.matrix = matrix.data;
              //Delay output by a bit so that output is rendered properly.
              setTimeout(function() {
                MathJax.Hub.Queue(["Typeset",MathJax.Hub, "MatrixRREF"]);
              });
              console.log($scope.matrix);
            }
        );
    };

});
