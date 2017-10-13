angular.module("fullstack").service("mainSrvc", function($http) {
  // you can use this function for every request to get user.
  // don't write new versions of this in every service, keep it DRY
  this.getUser = () => $http.get("/auth/me");

  // var user;

  // this.saveUser = function(newUser) {
  //   // Here we save the user so the service remembers who you are
  //   user = newUser;
  // };

  // this.getUser = function() {
  //   return user;
  // };

  // this.login = function(user) {
  //   return $http.post("/login", user);
  // };

  // this.getUserByAuthId = function(authid) {
  //   console.log("mainSrvc: " + authid)
  //   return $http.get("/users/" + authid);
  //   };
});
