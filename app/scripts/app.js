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
  SpotifyProvider.setClientId('8b81e3deddce42c4b0f2972e181b8a3a');
  var origin = document.location.origin;
  if (origin.indexOf('localhost') > -1) {
    SpotifyProvider.setRedirectUri(document.location.origin + '/spotify-callback.html');
  } else {
    SpotifyProvider.setRedirectUri('https://echelonapp.io/spotify-callback.html');
  }
  SpotifyProvider.setScope('user-read-private user-read-email');
}).config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
