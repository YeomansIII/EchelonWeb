'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('webApp')
  .controller('LoginCtrl', function($scope, $http, Auth, $location, Spotify) {
    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {
        rememberMe: true
      }).then(redirect, showError);
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      Auth.$authAnonymously({
        rememberMe: true
      }).then(redirect, showError);
    };

    function waitSpotify() {
      setTimeout(function() {
        //console.log(localStorage.getItem('spotify-token'));
        var spotToke = localStorage.getItem('spotify-token');
        if (spotToke === null) {
          waitSpotify();
        } else {
          console.log(spotToke);
          Spotify.getCurrentUser().then(function(data) {
            console.log(data);

            $http({
              url: "https://api.echelonapp.io:8081/spotify-auth/",
              method: "POST",
              data: {
                'uid': data['id']+"_spotify",
                'access_token': spotToke
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            }).success(function(response) {
              console.log(response);
              Auth.$authWithCustomToken(response).then(redirect, showError);
            });

            // $http.post("https://api.echelonapp.io:8081/spotify-auth/", {
            //     'uid': data['id'],
            //     'access_token': spotToke
            //   })
            //   .success(function(response) {
            //     Auth.$authAnonymously({
            //       rememberMe: true
            //     }).then(redirect, showError);
            //   });
          });
        }
      }, 2000);
    }

    $scope.spotifyLogin = function() {
      $scope.err = null;
      localStorage.setItem('spotify-token', null);
      Spotify.login();
      waitSpotify();
      // $http.get('https://accounts.spotify.com/authorize/?client_id=8b81e3deddce42c4b0f2972e181b8a3a&response_type=code&scope=user-read-private%20user-read-email&state=34fFs29kd09')
      //   .success(function(response) {
      //     $http.post("https://api.echelonapp.io:8081/spotify-auth/")
      //       .success(function(response) {
      //         Auth.$authAnonymously({
      //           rememberMe: true
      //         }).then(redirect, showError);
      //       });
      //   });
    };



    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  });
