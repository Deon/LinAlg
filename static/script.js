/**
 * Created by Owner on 11/21/2014.
 */

//Declare module
var app = angular.module('FirstYear', ['ui.bootstrap']);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})


app.controller('MainCtrl', function($scope, $http){

    $scope.time = null;
    $scope.finalMolarMass = null;
    $scope.originalFormula = null;
    $scope.isError = null;
    $scope.matrix = null;

    $scope.displayDate = function(){

        $http({
            url: '/getTime/'
        })
            .then(function(time){
                $scope.dateData = time.data;
                console.log($scope.dateData);
                $scope.date = $scope.dateData[0];
                $scope.time = $scope.dateData[1];
            }
        );
    };

    $scope.displayMatrix = function(){
        $http({
            url: '/getReducedMatrix/'
        })
            .then(function(matrix){
                $scope.matrix = matrix.data;
                console.log($scope.matrix);
            }
        );
    };

    $scope.testDate = function(){
        $scope.time ='Test time.';
        console.log($scope.time);
    };



    $scope.findMolarMass = function(model){
        if (model == null || model.name == null || model == "" || model.name == ""){
            $scope.isError = true;
            $scope.error = "You should fill it in!";
        }

        $scope.originalFormula = model;
        console.log($scope.originalFormula);
        if (!$scope.originalFormula){
            $scope.error = "You should fill it in!";
        }
        $http({
            url: '/postChemFormula',
            method: "POST",
            data: JSON.stringify({'formula':model}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(function(molarMass){
                $scope.finalMolarMass = molarMass.data;
                $scope.isError = null;
                if ($scope.finalMolarMass == null){
                    $scope.error = "Check your formula!";
                    $scope.finalMolarMass = null;
                }

                console.log($scope.finalMolarMass);
            },
            function(molarMass){
                console.log("Error in input.");
                $scope.error = "Check your formula!";
                $scope.finalMolarMass = null;
                $scope.isError = true;
            }
        );
    };

});

app.directive("mathjaxBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            $scope.$watch($attrs.mathjaxBind, function(value) {
                var $script = angular.element("<script type='math/tex'>")
                    .html(value == undefined ? "" : value);
                $element.html("");
                $element.append($script);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
            });
        }]
    };
});

function MyCtrl($scope, $element) {
    $scope.expression = "\\frac{5}{4} \\div \\frac{1}{6}";
}