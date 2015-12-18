'use strict';

/**
 * @ngdoc overview
 * @name echelonWebApp
 * @description
 * # echelonWebApp
 *
 * Main module of the application.
 */
angular.module('webApp', [
  'ngAnimate',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'firebase',
  'firebase.ref',
  'firebase.auth',
  'spotify',
  'ngAria',
  'ngMaterial',
  'ng-mfb'
]).config(function(SpotifyProvider) {
  SpotifyProvider.setClientId(atob('OGI4MWUzZGVkZGNlNDJjNGIwZjI5NzJlMTgxYjhhM2E='));
  var origin = document.location.origin;
  if (origin.indexOf(atob('bG9jYWxob3N0')) > -1) {
    SpotifyProvider.setRedirectUri(document.location.origin + atob('L3Nwb3RpZnktY2FsbGJhY2suaHRtbA=='));
  } else {
    SpotifyProvider.setRedirectUri(atob('aHR0cHM6Ly9lY2hlbG9uYXBwLmlvL3Nwb3RpZnktY2FsbGJhY2suaHRtbA=='));
  }
  SpotifyProvider.setScope('user-read-private user-read-email');
}).config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]).factory('Page', function() {
  var title = '';
  return {
    title: function() {
      return title;
    },
    setTitle: function(newTitle) {
      title = newTitle;
    }
  };
}).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('blue')
    .warnPalette('pink');
});

angular.module('webApp')
  .controller('HtmlCtrl', function($scope, Page) {
    $scope.Page = Page;
  });

angular.module('webApp')
  .controller('NavCtrl', function($scope, $mdSidenav) {
    console.log('start NavCtrl');
    $scope.openLeftMenu = function() {
      console.log('openLeftMenu clicked');
      $mdSidenav('left').toggle();
    };
    $scope.closeLeftMenu = function() {
      $mdSidenav('left').close();
    };
  });

$('.navbar-nav li').click(function() {
  var $this = $(this);
  if (!$this.hasClass('active')) {
    $('.navbar-nav li').removeClass('active');
    $this.addClass('active');
    var $navToggle = $('.navbar-toggle');
    if ($navToggle.css('display') !== 'none') {
      $navToggle.click();
    }
  }
});
