'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function($scope, $location, Auth, Firebase) {
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
      ref.child('queuegroups/' + groupName).once('value', function(dataSnapshot) {
        console.log('Join Group firebase response');
        if (dataSnapshot.val() !== null) {
          console.log('Join Group firebase response not null');
          $scope.$apply(function() {
            $location.path('/group');
          });
        } else {
          console.log('Join Group firebase response null');
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
