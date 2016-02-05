/*jshint camelcase:false*/
'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:YourMusicCtrl
 * @description
 * # YourMusicCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('YourMusicCtrl', function($scope, $location, $timeout, Spotify, Ref) {
    var $searchPage = $('.browsemusic-page');
    $(window).resize(function() {
      $searchPage.height($('.content').height());
    });

    var uid = Ref.getAuth().uid;
    var userRef = Ref.child('users/' + uid);
    var spotifyId = '';
    $scope.playlists = [];
    var offset = 0;

    $scope.load = function() {
      Spotify.getUserPlaylists(spotifyId, {
          limit: 10,
          offset: offset
        })
        .then(function(data) {
          offset += 10;
          data.items.forEach(function(currentValue) {
            $scope.playlists.push(currentValue);
          });
        });
    };

    userRef.child('id').once('value', function(dataSnapshot) {
      spotifyId = dataSnapshot.val();
      $scope.load();
    });

    $scope.viewPlaylist = function(index) {
      var playlist = $scope.playlists[index];
      $timeout(function() {
        $scope.$apply(function() {
          $location.path('/queue/browse/playlist/' + playlist.owner.id + '/' + playlist.id);
        });
      });
    };
  });
