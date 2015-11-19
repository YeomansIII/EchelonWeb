'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('GroupCtrl', function($scope, $location, Page, Firebase) {
    Page.setTitle('- Group');

    var groupName = '';
    var ref = new Firebase('https://flickering-heat-6442.firebaseio.com/');
    var userRef = ref.child('users/' + ref.getAuth().uid);
    userRef.child('cur_group').once('value', function(dataSnapshot) {
      if (dataSnapshot.val() === null) {
        $scope.$apply(function() {
          $location.path('/').search({action:'join'});
        });
      } else {
        groupName = dataSnapshot.val();
      }
    });

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
