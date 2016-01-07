/*jshint camelcase:false*/
'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:BrowseMusicCtrl
 * @description
 * # BrowseMusicCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('BrowseMusicCtrl', function($scope, $location, $timeout, Spotify) {
    var $searchPage = $('.browsemusic-page');
    $(window).resize(function() {
      $searchPage.height($('.content').height());
    });
    $scope.playlists = [];
    var date = new Date();
    Spotify.getFeaturedPlaylists({
        country: 'US',
        timestamp: date.toISOString()
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
