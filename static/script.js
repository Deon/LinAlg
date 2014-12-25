//MathJax Configuration
MathJax.Hub.Config({
  jax: ["input/TeX", "output/HTML-CSS","output/NativeMML"],
  tex2jax:{
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ]
  }
});

//Declare module
var app = angular.module('LinAlgToolkit', []);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


app.controller('MatrixController', function($scope, $http){
  $scope.rows = null;
  $scope.cols = null;
  $scope.isSizeSet = false;
  $scope.inputMatrix = null;
  $scope.error = null;
  $scope.response = null;


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

  $scope.displayMatrix = function(){
    console.log($scope.inputMatrix);
    checkMatrix();
    $scope.response = null;
    if ($scope.error == null) {
      $http.post('/getReducedMatrix/', $scope.inputMatrix)
      .then(function (matrix) {
        console.log(matrix);
        $scope.response = matrix.data;
        //Delay output by a bit so that output is rendered properly.
        setTimeout(function () {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });
      });
    }
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
});

app.controller('ComplexController', function($scope){
  $scope.real = null;
  $scope.imaginary = null;
  $scope.magnitude = null;
  $scope.argument = null;
  $scope.degrees = true;
  $scope.error = null;
  $scope.decimalPlaces = 4;
  $scope.button = "Degrees";

  $scope.toPolar = function(){
    //Error Handling

    if ($scope.real == null)
      $scope.real = 0;
    if ($scope.imaginary == null)
      $scope.imaginary = 0;

    if (isNaN($scope.real) || isNaN($scope.imaginary))
      $scope.error = "Please enter numbers only!";
    else
      $scope.error = null;
    //Math
    if (!$scope.error){
      //Magnitude
      $scope.magnitude = Math.sqrt(Math.pow($scope.real, 2)+Math.pow($scope.imaginary, 2)).toFixed($scope.decimalPlaces);

      //Argument
      if ($scope.degrees)
        $scope.argument = toDeg(calculateArgument()).toFixed($scope.decimalPlaces);
      else
        $scope.argument = calculateArgument().toFixed($scope.decimalPlaces);
    }
  };

  $scope.changeUnits = function(){
    $scope.degrees = !$scope.degrees;
    if ($scope.degrees) {
      $scope.argument = toDeg(calculateArgument()).toFixed($scope.decimalPlaces);
      $scope.button = "Degrees";
    }
    else {
      $scope.argument = calculateArgument().toFixed($scope.decimalPlaces);
      $scope.button = "Radians";
    }
  };
  //Returns argument in radians.
  var calculateArgument = function(){
    if ($scope.real == 0){
      if ($scope.imaginary == 0)
        return 0;
      else if ($scope.imaginary > 0)
        return Math.PI/2;
      else
        return Math.PI*3/2;
    }
    else if ($scope.imaginary == 0){
      if ($scope.real == 0)
        return 0;
      else if ($scope.real > 0)
        return 0;
      else if ($scope.real < 0)
        return Math.PI;
    }
    else
      return Math.atan2($scope.imaginary, $scope.real)
  };
  var toDeg = function (radians){
    return radians * 180 / Math.PI;
  };

  var toRad = function(degrees){
    return degrees * Math.PI/180;
  };

  $scope.toRectangular = function(){
    //Error checking
    if ($scope.magnitude == null)
      $scope.magnitude = 0;
    if ($scope.argument == null)
      $scope.argument = 0;

    if (isNaN($scope.magnitude) || isNaN($scope.argument))
      $scope.error = "Please enter numbers only!";
    else
      $scope.error = null;
    //Math

    if (!$scope.error) {
      if ($scope.degrees) {
        $scope.real = (Math.cos(toRad($scope.argument)) * $scope.magnitude).toFixed($scope.decimalPlaces);
        $scope.imaginary = (Math.sin(toRad($scope.argument)) * $scope.magnitude).toFixed($scope.decimalPlaces);
      }
      else {
        $scope.real = (Math.cos($scope.argument) * $scope.magnitude).toFixed($scope.decimalPlaces);
        $scope.imaginary = (Math.sin($scope.argument) * $scope.magnitude).toFixed($scope.decimalPlaces);
      }
    }
  };
});