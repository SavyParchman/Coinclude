angular.module("fullstack").service("ratingSrvc", function($http) {
  
  this.ratings;
  this.postNewWalletRating = function(rating_val) {
    console.log("Hello from ratingSrvc:", rating_val)
    return $http.post('/ratings', {rating_val})
  }; 
  
  this.getWalletRatings = function() {
    return $http.get('/ratings').then(res => {
      console.log(res.data);   //  CL'ing wallet_ratings table
      return res;
    });
  }

  
  });
  





































  // /angular.module("theBlog").service("mainServ", function($http){
    
  //   this.addPosts = function(blogText){
  //     console.log("Hello from MainServ:", blogText)
  //     return $http.post('/postBlog', blogText)
  //   }
    
  //   this.getPosts = function(){
  //     return $http.get('/postBlog').then(res => {
  //       console.log(res.data);
  //       this.post = res.data;
  //       return res;
  //     });
  //   }
    
  //   this.updatePosts = function(data) {
  //     return $http.put('/postBlog', data)
  //   }
    
  //   this.deletePosts = function(id){
  //     return $http.delete('/deleteBlog/' + id)
  //   }
    
  //   this.getSignedUrl = function(file) {
  //         return $http.get(`/api/s3?file_name=${file.name}&file_type=${file.type}`)
  //      }
    
  //   this.uploadFile = function(file, signed_request) {
  //     console.log('uploadfile')
  //         return $http.put(signed_request, file, {headers: {'x-amz-acl': 'public-read'}})
  //      }
    
  //   })
    