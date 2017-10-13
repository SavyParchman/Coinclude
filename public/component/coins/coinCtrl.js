angular.module("fullstack").controller("coinCtrl", function($scope, $filter, coinSrvc) {
  
    function getCoins() {
      coinSrvc.getCoins().then(function(res) {
      console.log(res.data);
      $scope.coins = res.data;
    })
  }
  getCoins();

  // coinSrvc.getcoinbyName().then(function
    
    $scope.sortType = 'coinname';
    $scope.secondSortType = 'coinreviews';
    $scope.thirdSortType = 'coinrating';
    $scope.filterTable = '';
    
    // get the coin data
    // $scope.coins = peopleFactory;*****
    // console.log($scope.dataArray);
    
    //---- Pagination Settings -----
    $scope.currentPage = 1;
    $scope.maxPaginationSize = 100;
    $scope.itemsPerPage = 20;
    
    //------ Page Change ------
    // corresponds with ng-change
    $scope.updatePageIndexes = function () {
      $scope.firstIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
      $scope.lastIndex = $scope.currentPage * $scope.itemsPerPage;
    };
    $scope.updatePageIndexes();
    
    //------ Search Filter ------
    $scope.filterSort = function(element) {
      if ($filter('filter')([element], $scope.filterTable).length > 0) {
        return 1;
      }
      return 2;
    };

    function matchFirstChar(c, string) {
      return (string.charAt(0) == c);
    }
    
    function removeFirstChar(string) {
      return string.slice(1);
    }
    
    function removeDash(label) {
      if (matchFirstChar('-', label)) {
        return removeFirstChar(label);
      }
      return label;
    }
    
    function addDash(label) {
      if (!matchFirstChar('-', label)) {
        return '-' + label;
      }
      return label;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function makeReadableLabel(label) {
      var formatted = label;
      switch (label) {
        case 'coinreviews':
          formatted = 'coin reviews';
          break;
        case 'coinrating':
          formatted = 'coin rating';
      }
      return formatted;
    }

    $scope.sortReverse = function(set) {
      set = set || false;
      if (set || !matchFirstChar('-', $scope.sortType)) {
        $scope.sortType = addDash($scope.sortType);
      } else {
        $scope.sortType = removeDash($scope.sortType);
      }
    };
    
    $scope.singleSort = function(label) {
      if ($scope.sortType == label) {
        $scope.sortReverse();
      } else {
        $scope.sortType = label;
      }
    };

    $scope.doubleSort = function(label1, label2) {
      if ($scope.sortType == ('-' + label1)) {
        $scope.sortType = label2;
      } else if ($scope.sortType == ('-' + label2)) {
        $scope.sortType = label1;
      } else if ($scope.sortType != label1 && $scope.sortType != label2) {
        $scope.sortType = label1;
      } else {
        $scope.sortReverse();
      }
    };
  
    $scope.sortDescend = function(label1, label2) {
      label2 = label2 || '';
      return ($scope.sortType == label1 || $scope.sortType == label2);
    };
    
    $scope.sortAscend = function(label1, label2) {
      label2 = label2 || '';
      return ($scope.sortType == ('-' + label1) || $scope.sortType == ('-' + label2));
    };

    $scope.sortTooltip = function(label1, label2) {
      label2 = label2 || '';
      
      var order = 'descending';
      if (matchFirstChar('-', $scope.sortType)) {
        order = 'ascending';
      }
      
      var baseSortType = removeDash($scope.sortType);
      if (label1 == baseSortType || label2 == baseSortType) {
        return capitalizeFirstLetter((makeReadableLabel(baseSortType)) + ' ' + order);
      }
      return 'Sort by ' + makeReadableLabel(label1) + ' or ' + makeReadableLabel(label2);
    };
    
});