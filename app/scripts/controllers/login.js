'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('webApp')
  .controller('LoginCtrl', function($scope, $http, Auth, $location, Spotify, Firebase, $timeout) {
    var $loginPage = $('.login-page');
    var $mainToolbar = $('.main-toolbar');
    var $sideNavLeft = $('.md-sidenav-left');
    $mainToolbar.hide();
    $sideNavLeft.hide();
    $(window).resize(function() {
      $loginPage.height($('#content').height());
    });
    $loginPage.height($('#content').height());

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
        if (spotToke === 'null') {
          waitSpotify();
        } else {
          console.log(spotToke);
          Spotify.getCurrentUser().then(function(data) {
            console.log(data);
            var uid = data.id + '_spotify';

            $http({
              url: 'https://api.echelonapp.io:8081/spotify-auth/',
              method: 'POST',
              data: {
                'uid': uid,
                'access_token': spotToke
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            }).success(function(response) {
              console.log(response);
              Auth.$authWithCustomToken(response).then(redirect(data), showError);
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
      }, 1500);
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



    function redirect(data) {
      console.log(data);
      if (data.provider === 'anonymous') {
        $timeout(function() {
          $mainToolbar.show();
          $sideNavLeft.show();
          $scope.$apply(function() {
            $location.path('/main');
          });
        });
      } else if (data.product) {
        var uid = data.id + '_spotify';
        var ref = new Firebase('https://flickering-heat-6442.firebaseio.com/users/' + uid);
        ref.once('value', function(snapshot) {
          if (snapshot.val() === null) {
            console.log('Got snapshot');
            var userObj = {
              country: data.country,
              display_name: data.display_name,
              email: data.email,
              ext_url: data.external_urls.spotify,
              id: data.id,
              product: data.product,
              type: data.type,
              uri: data.uri
            };
            var images = data.images;
            if (images.length > 0) {
              userObj.image_url = images[0].url;
            }
            ref.set(userObj);
          }
          $mainToolbar.show();
          $sideNavLeft.show();
          $scope.$apply(function() {
            $location.path('/main');
          });
        }, function(errorObject) {
          console.log('User read failed: ' + errorObject.code);
        });
      }
    }

    function showError(err) {
      $scope.err = err;
    }


  });
