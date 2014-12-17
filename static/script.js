/**
 * Created by Owner on 11/21/2014.
 */

//MathJax Configuration
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
});


app.controller('MainCtrl', function($scope, $http){

  $scope.isError = null;
  $scope.renderedMatrix = null;
  $scope.rrefmatrix = null;
  $scope.rows = null;
  $scope.cols = null;
  $scope.isSizeSet = false;
  $scope.inputMatrix = false;

  $scope.displayMatrix = function(){

    console.log($scope.inputMatrix);
      $http.post('/getReducedMatrix/', $scope.inputMatrix)
          .then(function(matrix){
            $scope.renderedMatrix = matrix.data[0];
            $scope.rrefMatrix = matrix.data[1]

            //Delay output by a bit so that output is rendered properly.
            setTimeout(function() {
              MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            });
            console.log($scope.matrix);
          }
      );
  };


  $scope.setSize = function() {
    console.log($scope.rows);
    console.log($scope.cols);
    setTimeout(function() {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    });
    if ($scope.rows != null && $scope.rows != undefined && $scope.rows != "" && $scope.cols != null
        && $scope.cols != undefined && $scope.cols != "")
      $scope.isSizeSet = true;

    //Creates new 2D Array to hold values inputted by the user.
    $scope.inputMatrix = new Array(parseInt($scope.rows));
    for (var i = 0; i < $scope.rows; i++){
      $scope.inputMatrix[i] = new Array(parseInt($scope.cols));
    }
    console.log($scope.inputMatrix);
  };

  //Returns array for looping.
  $scope.getRows = function(){
    //console.log(new Array(parseInt($scope.rows)));
    if ($scope.rows) return new Array(parseInt($scope.rows));
    else return 0;
  };

  $scope.getCols = function(){
    if ($scope.cols) return new Array(parseInt($scope.cols));
    else return 0;
  };


});
