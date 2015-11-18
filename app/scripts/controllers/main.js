'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function($scope, $location, Auth, Firebase, Page) {
    Page.setTitle('');
    var ref = new Firebase('https://flickering-heat-6442.firebaseio.com/');
    var $mainPage = $('.main-page');
    $(window).resize(function() {
      $mainPage.height($(window).height() - 50);
    });
    $mainPage.height($(window).height() - 50);
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
                'active':true,
                'displayName':dataSnapshot2.child('display_name').val(),
                'extUrl':dataSnapshot2.child('ext_url').val(),
                'imageUrl':dataSnapshot2.child('image_url').val()
            };
            console.log(particMe);
            groupRef.child('participants/'+ref.getAuth().uid).set(particMe);
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

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
