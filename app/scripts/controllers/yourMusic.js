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

    $scope.playlists = [];
    Spotify.getUserPlaylists(userRef.id, {
        limit: 10
      })
      .then(function(data) {
        $scope.featured = data;
      });

    $scope.viewPlaylist = function(index) {
      var playlist = $scope.featured.playlists.items[index];
      $timeout(function() {
        $scope.$apply(function() {
          $location.path('/queue/browse/playlist/' + playlist.owner.id + '/' + playlist.id);
        });
      });
    };
  });
