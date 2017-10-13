angular.module("fullstack").controller("infoCtrl", function($scope) {


    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = value;
    };

    $scope.ratingStates = [
      { stateOn: "glyphicon-star", stateOff: "glyphicon-star-empty" }
    ];

    $scope.$watch("rate", function(value) {
      console.log(value);
    });

    $scope.submit = function() {
      console.log($scope.percent) ; //null
  
  };
});
