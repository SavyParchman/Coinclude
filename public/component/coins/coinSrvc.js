angular.module("fullstack").service("coinSrvc", function($http) {
  
  this.coins;
  this.getCoins = function() {
    return $http.get('/coins').then(res => {
      console.log(res.data);
      return res;
    });
  }


  // this.getCoinByName = function(coinname) {
  //   return $http.get("/coins/" + coinname);
  // }

});