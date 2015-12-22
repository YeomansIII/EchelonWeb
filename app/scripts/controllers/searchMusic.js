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
  .controller('SearchMusicCtrl', function($scope, $location, $timeout, Spotify, Firebase, addMusicService) {
    var $searchPage = $('.searchmusic-page');
    $(window).resize(function() {
      $searchPage.height($('.content').height());
    });
    $searchPage.height($('.content').height());
    $scope.query = '';
    $scope.tracks = [];
    $scope.makeSearch = function() {
      $scope.tracks = [];
      Spotify.search($scope.query, 'track').then(function(data) {
        console.log(data);
        data.tracks.items.forEach(function(object) {
          console.log(object);
          //$searchPage.css('justify-content', 'flex-start');
          $('.add-song-list').css('max-height', '5000px');
          //$searchPage.height('auto');
          var $searchInputWrapper = $('.search-input-wrapper');
          var interval = window.setInterval(function() {
            console.log($searchInputWrapper.position.top);
            if ($searchInputWrapper.position().top === 0) {
              $searchPage.height('auto');
              window.clearInterval(interval);
            }
          }, 500);
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

    $scope.addSongToQueue = function(index) {
      addMusicService.addSongData($scope.tracks[index]);
      $timeout(function() {
        $scope.$apply(function() {
          $location.path('/group');
        });
      });
    };
  });
