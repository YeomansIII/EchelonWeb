'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('HomeCtrl', function(Page) {
    Page.setTitle(': A Spotify Jukebox');
    var $mainToolbar = $('.main-toolbar');
    var $sideNavLeft = $('.md-sidenav-left');
    $mainToolbar.hide();
    $sideNavLeft.hide();
  });
