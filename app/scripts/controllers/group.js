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

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    var compareTracks = function(a, b) {
      var srating = 0;
      if (b.votedUp !== undefined) {
        srating += b.votedUp.length;
      }
      if (b.votedDown !== undefined) {
        srating -= b.votedDown.length;
      }
      var arating = 0;
      if (a.votedUp !== undefined) {
        arating += a.votedUp.length;
      }
      if (a.votedDown !== undefined) {
        arating -= a.votedDown.length;
      }
      var result = srating <= arating ? (srating === arating ? 0 : -1) : 1;
      if (result === 0) {
        result = a.added <= b.added ? (a.added === b.added ? 0 : -1) : 1;
      }
      return result;
    };

    var ref = new Firebase('https://flickering-heat-6442.firebaseio.com/');
    var userRef = ref.child('users/' + ref.getAuth().uid);
    var groupRef;
    userRef.child('cur_group').once('value', function(dataSnapshot) {
      if (dataSnapshot.val() === null) {
        $scope.$apply(function() {
          $location.path('/').search({
            action: 'join'
          });
        });
      } else {
        $scope.groupName = dataSnapshot.val();
        groupRef = ref.child('queuegroups/' + $scope.groupName);
        groupRef.on('value', function(dataSnapshot2) {
          if (dataSnapshot2.val() === null) {
            $scope.$apply(function() {
              $location.path('/').search({
                action: 'join'
              });
            });
          } else {
            var tracksArr = [];
            dataSnapshot2.child('tracks').forEach(function(childSnapshot) {
              var temp = childSnapshot.val();
              if (temp.nowPlaying !== true && temp.played !== true) {
                if (temp.votedUp !== undefined) {
                  temp.votedUp = Object.keys(temp.votedUp);
                }
                if (temp.votedDown !== undefined) {
                  temp.votedDown = Object.keys(temp.votedDown);
                }
                tracksArr.push(temp);
              } else if (temp.nowPlaying === true) {
                if (temp.votedUp !== undefined) {
                  temp.votedUp = Object.keys(temp.votedUp);
                }
                if (temp.votedDown !== undefined) {
                  temp.votedDown = Object.keys(temp.votedDown);
                }
                $scope.nowPlayingTrack = temp;
              }
            });
            tracksArr.sort(compareTracks);
            console.log(tracksArr);
            $scope.tracks = tracksArr;
            $scope.safeApply();
          }
        });
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

    $scope.voteUp = function(track) {
      console.log('Vote Up: ' + track.key);
      var uid = ref.getAuth().uid;
      if (track.votedUp !== undefined && track.votedUp.indexOf(uid) > -1) {
        groupRef.child('tracks/' + track.key + '/votedUp/' + uid).remove();
      } else {
        groupRef.child('tracks/' + track.key + '/votedDown/' + uid).remove();
        groupRef.child('tracks/' + track.key + '/votedUp/' + uid).set(true);
      }
    };
    $scope.voteDown = function(track) {
      console.log('Vote Down: ' + track.key);
      var uid = ref.getAuth().uid;
      if (track.votedDown !== undefined && track.votedDown.indexOf(uid) > -1) {
        groupRef.child('tracks/' + track.key + '/votedDown/' + uid).remove();
      } else {
        groupRef.child('tracks/' + track.key + '/votedUp/' + uid).remove();
        groupRef.child('tracks/' + track.key + '/votedDown/' + uid).set(true);
      }
    };
  });
