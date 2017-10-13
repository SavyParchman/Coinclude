angular.module("fullstack").controller("walletCtrl", function($scope, $filter, walletSrvc) {
  
    function getWallets() {
      walletSrvc.getWallets().then(function(res) {
      console.log(res.data);
      $scope.wallets = res.data;
    })
  }
  getWallets();

  // walletSrvc.getWalletbyName().then(function
    

    $scope.isCollapsed = true;

    // set the default sort types
    // '-' at the beginning of the string sorts in reverse
    // orderBy: also accepts a boolean to sort in reverse
    // but the boolean sorts all categories in reverse
    // in this case we only want to sort the first category in reverse
    $scope.sortType = 'walletname';
    // the table will first be sorted by 'sortType' and then by 'secondSortType'
    // followed by 'thirdSortType'
    $scope.secondSortType = 'walletreviews';
    $scope.thirdSortType = 'walletrating';
    // set the default search/filter term
    $scope.filterTable = '';
    
    // get the wallet data
    // $scope.wallets = peopleFactory;*****
    // console.log($scope.dataArray);
    
    //---- Pagination Settings -----
    $scope.currentPage = 1;
    $scope.maxPaginationSize = 100;
    $scope.itemsPerPage = 20;
    
    //------ Page Change ------
    // this will be called when the user changes page in the pagination bar
    // corresponds with ng-change
    $scope.updatePageIndexes = function () {
      $scope.firstIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
      $scope.lastIndex = $scope.currentPage * $scope.itemsPerPage;
    };
    $scope.updatePageIndexes();
    
    //------ Search Filter ------
    // return 1 if the element is filtered
    // used to hide elements that do not match the search filter
    $scope.filterSort = function(element) {
      if ($filter('filter')([element], $scope.filterTable).length > 0) {
        return 1;
      }
      return 2;
    };
    
    // string manipulation functions
    // primarily used for sorting the table
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
    
    // formatting functions
    // for displaying table headers and tooltips
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function makeReadableLabel(label) {
      var formatted = label;
      switch (label) {
        case 'walletreviews':
          formatted = 'wallet reviews';
          break;
        case 'walletrating':
          formatted = 'wallet rating';
      }
      return formatted;
    }
    
    // sort functions
    // add or remove '-' to sort up or down
    $scope.sortReverse = function(set) {
      set = set || false;
      if (set || !matchFirstChar('-', $scope.sortType)) {
        $scope.sortType = addDash($scope.sortType);
      } else {
        $scope.sortType = removeDash($scope.sortType);
      }
    };
    
    // sort a column with a single data attribute
    $scope.singleSort = function(label) {
      if ($scope.sortType == label) {
        $scope.sortReverse();
      } else {
        $scope.sortType = label;
      }
    };
    
    // sort a column with two data attributes
    // example: wallet reviews (quantity) / wallet rating
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
    
    // boolean functions for detecting how a column is sorted
    // used for the up and down carets next to each column header
    $scope.sortDescend = function(label1, label2) {
      label2 = label2 || '';
      return ($scope.sortType == label1 || $scope.sortType == label2);
    };
    
    $scope.sortAscend = function(label1, label2) {
      label2 = label2 || '';
      return ($scope.sortType == ('-' + label1) || $scope.sortType == ('-' + label2));
    };
    
    // show a tooltip displaying how a column is sorted
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