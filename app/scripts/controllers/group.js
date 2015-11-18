'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('GroupCtrl', function($scope) {
    var $queue = $('#queue');
    var $participants = $('#participants');
    $scope.queueTab = function() {
      $participants.hide();
      $queue.show();
    };
    $scope.participantsTab = function() {
      $queue.hide();
      $participants.show();
    };
  });
