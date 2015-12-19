/*jshint camelcase:false*/
'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:SearchMusicCtrl
 * @description
 * # SearchMusicCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('SearchMusicCtrl', function($scope, Spotify, Firebase) {
    $scope.query = '';
    $scope.tracks = [];
    $scope.makeSearch = function() {
      $scope.tracks = [];
      Spotify.search($scope.query, 'track').then(function(data) {
        console.log(data);
        data.tracks.items.forEach(function(object) {
          console.log(object);
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
    };
  });
