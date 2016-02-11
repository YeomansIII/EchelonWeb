'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('webApp')
  .controller('GroupCtrl', function($scope, $location, $timeout, Page, Ref) {
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

    var uid = Ref.getAuth().uid;
    var userRef = Ref.child('users/' + uid);
    var groupRef;
    userRef.child('cur_group').once('value', function(dataSnapshot) {
      if (dataSnapshot.val() === null) {
        $timeout(function() {
          $scope.$apply(function() {
            $location.path('/').search({
              action: 'join'
            });
          });
        });
      } else {
        $scope.groupName = dataSnapshot.val();
        groupRef = Ref.child('queuegroups/' + $scope.groupName);
        groupRef.on('value', function(dataSnapshot2) {
          if (dataSnapshot2.val() === null) {
            $timeout(function() {
              $scope.$apply(function() {
                $location.path('/').search({
                  action: 'join'
                });
              });
            });
          } else {
            var tracksArr = [];
            dataSnapshot2.child('tracks').forEach(function(childSnapshot) {
              var temp = childSnapshot.val();
              if (temp.nowPlaying !== true && temp.played !== true) {
                if (temp.votedUp !== undefined) {
                  if (uid in temp.votedUp) {
                    temp.isVotedUp = 'voted-up';
                  }
                  temp.votedUp = Object.keys(temp.votedUp);
                }
                if (temp.votedDown !== undefined) {
                  if (uid in temp.votedDown) {
                    temp.isVotedDown = 'voted-down';
                  }
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
      if (track.votedUp !== undefined && track.votedUp.indexOf(uid) > -1) {
        groupRef.child('tracks/' + track.key + '/votedUp/' + uid).remove();
      } else {
        groupRef.child('tracks/' + track.key + '/votedDown/' + uid).remove();
        groupRef.child('tracks/' + track.key + '/votedUp/' + uid).set(true);
      }
    };
    $scope.voteDown = function(track) {
      console.log('Vote Down: ' + track.key);
      if (track.votedDown !== undefined && track.votedDown.indexOf(uid) > -1) {
        groupRef.child('tracks/' + track.key + '/votedDown/' + uid).remove();
      } else {
        groupRef.child('tracks/' + track.key + '/votedUp/' + uid).remove();
        groupRef.child('tracks/' + track.key + '/votedDown/' + uid).set(true);
      }
    };

    $scope.hidden = false;
    $scope.isOpen = false;
    $scope.hover = false;
    $scope.searchMusic = function() {
      $timeout(function() {
        $scope.$apply(function() {
          $location.path('/queue/search');
        });
      });
    };
    $scope.browseMusic = function() {
      $timeout(function() {
        $scope.$apply(function() {
          $location.path('/queue/browse');
        });
      });
    };
    $scope.yourMusic = function() {
      $timeout(function() {
        $scope.$apply(function() {
          $location.path('/queue/yourmusic');
        });
      });
    };
    // On opening, add a delayed property which shows tooltips after the speed dial has opened
    // so that they have the proper position; if closing, immediately hide the tooltips
    $scope.$watch('isOpen', function(isOpen) {
      if (isOpen) {
        $timeout(function() {
          $scope.tooltipVisible = $scope.isOpen;
        }, 600);
      } else {
        $scope.tooltipVisible = $scope.isOpen;
      }
    });
    $scope.fabItems = [{
      name: 'Search',
      icon: 'spoticon-search-32',
      direction: 'left',
      click: $scope.searchMusic
    }, {
      name: 'My Music',
      icon: 'spoticon-collection-32',
      direction: 'left',
      click: $scope.yourMusic
    }, {
      name: 'Browse Music',
      icon: 'spoticon-browse-32',
      direction: 'left',
      click: $scope.browseMusic
    }];
  });
