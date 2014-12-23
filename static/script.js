/**
 * Created by Owner on 11/21/2014.
 */

//MathJax Configuration
MathJax.Hub.Config({
  jax: ["input/TeX", "output/HTML-CSS","output/NativeMML"],
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


app.controller('MainController', function($scope, $http){

  $scope.isError = null;
  $scope.rows = null;
  $scope.cols = null;
  $scope.isSizeSet = false;
  $scope.inputMatrix = null;
  $scope.error = null;
  $scope.response = null;

  var checkMatrix = function(){
    for (var i = 0; i < $scope.rows; i++){
      for (var j = 0; j < $scope.cols; j++){
        if ($scope.inputMatrix[i][j] == "" || $scope.inputMatrix[i][j] == undefined || $scope.inputMatrix[i][j] == null){
          $scope.error = "Make sure you fill everything in!";
          return;
        }
        if (isNaN($scope.inputMatrix[i][j])){
          $scope.error = "Enter only numbers please!";
          return;
        }
      }
    }
    $scope.error = null;
  };
  $scope.displayMatrix = function(){
    console.log($scope.inputMatrix);
    checkMatrix();
    $scope.response = null;
    if ($scope.error == null) {
      $http.post('/getReducedMatrix/', $scope.inputMatrix)
      .then(function (matrix) {
        console.log(matrix);
        $scope.response = matrix.data;
        console.log($scope.response.original);
        //Delay output by a bit so that output is rendered properly.
        setTimeout(function () {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });
      });
    }
  };


  $scope.setSize = function() {
    console.log($scope.rows);
    console.log($scope.cols);

    if (isNaN($scope.rows) || isNaN($scope.cols)){
      $scope.error = "That isn't a number!";
    }

    else if (($scope.rows == null || $scope.rows == undefined || $scope.rows == "") || ($scope.cols == null
        || $scope.cols == undefined || $scope.cols == "")){
      $scope.error = "You should enter something!";
    }
    else{
      $scope.isSizeSet = true;
      $scope.error = null;
      //Creates new 2D Array to hold values inputted by the user.
      $scope.inputMatrix = new Array(parseInt($scope.rows));
      for (var i = 0; i < $scope.rows; i++){
        $scope.inputMatrix[i] = new Array(parseInt($scope.cols));
      }
      console.log($scope.inputMatrix);
    }
    console.log($scope.error);
    $scope.response = null;
  };

  //Returns array for looping.
  $scope.getRows = function(){
    if ($scope.rows && !isNaN($scope.rows)) return new Array(parseInt($scope.rows));
    else return 0;
  };

  $scope.getCols = function(){
    if ($scope.cols && !isNaN($scope.cols)) return new Array(parseInt($scope.cols));
    else return 0;
  };


});
