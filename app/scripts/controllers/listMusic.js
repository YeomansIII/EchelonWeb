/*jshint camelcase:false*/
'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:ListMusicCtrl
 * @description
 * # ListMusicCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('ListMusicCtrl', function($scope, $location, $timeout, Spotify, Firebase, addMusicService, $routeParams) {
    $scope.uid = $routeParams.uid;
    $scope.pid = $routeParams.pid;
    $scope.query = '';
    $scope.tracks = [];
    Spotify.getPlaylist($scope.uid, $scope.pid).then(function(data) {
      console.log(data);
      data.tracks.items.forEach(function(object) {
        console.log(object);
        object = object.track;
        //$searchPage.css('justify-content', 'flex-start');
        $('.add-song-list').css('max-height', '5000px');
        //$searchPage.height('auto');
        var temp = {
          added: Firebase.ServerValue.TIMESTAMP,
          album: object.album.name,
          albumArtSmall: object.album.images[0].url,
          artist: object.artists[0].name,
          lengthMs: object.duration_ms,
          songId: object.id,
          title: object.name,
          uri: object.uri
        };
        $scope.tracks.push(temp);
      });
    });

    $scope.addSongToQueue = function(index) {
      addMusicService.addSongData($scope.tracks[index]);
      $timeout(function() {
        $scope.$apply(function() {
          $location.path('/group');
        });
      });
    };
  });
