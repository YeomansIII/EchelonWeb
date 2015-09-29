'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function($scope, Auth) {
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
