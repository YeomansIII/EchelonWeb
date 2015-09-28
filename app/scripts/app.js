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
  'ngTouch',
  'firebase',
  'firebase.ref',
  'firebase.auth',
  'spotify'
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
}]);
