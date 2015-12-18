'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function($scope, $timeout, $location, $mdDialog, Auth, Firebase, Page) {
    Page.setTitle('');

    $.urlParam = function(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results === null) {
        return null;
      } else {
        return results[1] || 0;
      }
    };

    var ref = new Firebase('https://flickering-heat-6442.firebaseio.com/');
    var uid = ref.getAuth().uid;
    var userRef = ref.child('users/' + uid);
    var $mainPage = $('.main-page');
    $(window).resize(function() {
      $mainPage.height($('#content').height());
    });
    $mainPage.height($('#content').height());
    var $mainPageHome = $('.main-page-home');
    var $mainPageJoin = $('.main-page-join');
    $scope.joinGroup = function() {
      $mainPageHome.slideUp('fast');
      $mainPageJoin.slideDown('fast');
    };

    $scope.join = function() {
      console.log('Join Group clicked');
      var $mainPageJoinText = $('.main-page-join input:text');
      var groupName = $mainPageJoinText.val();
      var groupRef = ref.child('queuegroups/' + groupName);
      var userRef = ref.child('users/' + ref.getAuth().uid);
      groupRef.once('value', function(dataSnapshot) {
        if (dataSnapshot.val() !== null) {
          userRef.once('value', function(dataSnapshot2) {
            var particMe = {
              'active': true,
              'displayName': dataSnapshot2.child('display_name').val(),
              'extUrl': dataSnapshot2.child('ext_url').val(),
              'imageUrl': dataSnapshot2.child('image_url').val()
            };
            console.log(particMe);
            groupRef.child('participants/' + ref.getAuth().uid).set(particMe);
            userRef.child('cur_group').set(dataSnapshot.child('name').val());
            $scope.$apply(function() {
              $location.path('/group');
            });
          });
        } else {
          $mainPageJoinText.addClass('no-group-error');
        }
      });
    };

    $scope.backFromJoin = function() {
      $mainPageJoin.slideUp('fast');
      $mainPageHome.slideDown('fast');
    };

    $scope.logout = function() {
      Auth.$unauth();
    };

    $scope.checkGroup = function() {
      userRef.child('cur_group').once('value', function(dataSnapshot) {
        if (dataSnapshot.val() !== null) {
          var groupName = dataSnapshot.val();
          var groupRef = ref.child('queuegroups/' + groupName);
          groupRef.once('value', function(dataSnapshot2) {
            if (dataSnapshot2.child('leader').val() === uid) {
              var confirm = $mdDialog.confirm()
                .title('You are the leader of a group')
                .textContent('You are the leader of "' + groupName + '", would you like to go to it?')
                .ariaLabel('Already in group')
                .ok('Take me to it!')
                .cancel('Destroy the group');
              $mdDialog.show(confirm).then(function() {
                $timeout(function() {
                  $scope.$apply(function() {
                    $location.path('/group');
                  });
                });
              }, function() {
                userRef.child('cur_group').remove();
                ref.child('queuegroups/' + groupName).remove();
              });
            } else if (dataSnapshot2.child('participants/' + uid).val() !== null) {
              var confirm2 = $mdDialog.confirm()
                .title('You are in a group')
                .textContent('You are already a part of "' + groupName + '", would you like to go to it?')
                .ariaLabel('Already in group')
                .ok('Take me to it!')
                .cancel('Leave group');
              $mdDialog.show(confirm2).then(function() {
                $timeout(function() {
                  $scope.$apply(function() {
                    $location.path('/group');
                  });
                });
              }, function() {
                userRef.child('cur_group').remove();
                ref.child('queuegroups/' + groupName + '/participants/' + uid).remove();
              });
            } else {
              userRef.child('cur_group').remove();
            }
          });
        }
      });
    };

    if ($.urlParam('action') === 'join') {
      $scope.joinGroup();
    }

    $scope.checkGroup();
  });
