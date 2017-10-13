angular.module("fullstack").controller("ratingCtrl", function($scope, $stateParams, ratingSrvc) {

  function getWalletRatings() {
    ratingSrvc.getWalletRatings().then(function(res) {
      console.log('ratings:', res.data);   // CL'ing wallet_ratings table
      $scope.ratings = res.data;
    })
  }
  getWalletRatings();


  $scope.postNewWalletRating = function(rating_val) {
    console.log("Rated: " + rating_val);
    ratingSrvc.postNewWalletRating(rating_val)
    .then(response => {
      console.log(response)
    }

      // getWalletRatings();
      // $scope.rating.wallet_id = ''
      // $scope.rating.rating_val = ''
  )}

  $scope.$watch("rating_val", function(rating_val) {
    console.log("Clicked: " + rating_val);
  });


  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;
  $scope.hoveringOver = function(rating_val) {
    $scope.overStar = rating_val;
    $scope.percent = rating_val;
  };
  
  $scope.ratingStates = [{ stateOn: "glyphicon-star", stateOff: "glyphicon-star-empty" }];
  
  
  $scope.submit = function() {
    console.log("Submited: " + $scope.percent); 
};
  
});



















  
//     $scope.updatePost = function(updatedTextbox){
//       console.log("update controller")
//       mainServ.updatePosts(updatedTextbox).then(function(response) {
//         getPosts()
//       })
//     }
  
//     $scope.deletePost = function(id){
//       mainServ.deletePosts(id).then(function(response){
//         getPosts()
//       })
//     }
  
//     var url;
//      document.getElementById('file-input')
//      .addEventListener('change', function(e) {
//         console.log(e.target.files)
//         var file = e.target.files[0]
//         mainServ.getSignedUrl(file)
//         .then(function(response) {
//            console.log(response)
//            url = response.data.url
//            return mainServ.uploadFile(file, response.data.signed_request, response.data.url)
//         })
//         .then(function(response) {
//            console.log(response)
//            $scope.imageUrl = url
//            $scope.addPost = function(blogTextbox){
//              console.log("hello from controller:" ,blogTextbox)
//              blogTextbox.url = url;
//              mainServ.addPosts(blogTextbox).then(function(response){
//                getPosts()
//                $scope.blog.post = ''
//                $scope.blog.title = ''
//              })
//            }
  
//         })
//      })
  
//   })