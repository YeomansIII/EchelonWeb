'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:SearchMusicCtrl
 * @description
 * # SearchMusicCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('SearchMusicCtrl', function($scope, Spotify) {
    $scope.query = '';
    $scope.makeSearch = function() {
      Spotify.search($scope.query, 'track').then(function(data) {
        console.log(data);
      });
    };
  });
