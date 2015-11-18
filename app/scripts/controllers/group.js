'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('GroupCtrl', function($scope, Page) {
    Page.setTitle('- Group');
    var $queue = $('#queue');
    var $queueTabButton = $('#queue-tab');
    var $participants = $('#participants');
    var $participantsTabButton = $('#partic-tab');
    $scope.queueTab = function() {
      $queueTabButton.addClass('active');
      $participantsTabButton.removeClass('active');
      $participants.hide();
      $queue.show();
    };
    $scope.participantsTab = function() {
      $participantsTabButton.addClass('active');
      $queueTabButton.removeClass('active');
      $queue.hide();
      $participants.show();
    };
  });
