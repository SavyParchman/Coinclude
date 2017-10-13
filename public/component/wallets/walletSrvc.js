angular.module("fullstack").service("walletSrvc", function($http) {
  
  this.wallets;
  this.getWallets = function() {
    return $http.get('/wallets').then(res => {
      console.log(res.data);
      return res;
    });
  }


  // this.getWalletByName = function(walletname) {
  //   return $http.get("/wallets/" + walletname);
  // }

});

