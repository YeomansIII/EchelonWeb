'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('webApp')
  .controller('AccountCtrl', function($scope, user, Page, Auth, Ref, $firebaseObject) {
    Page.setTitle('- Account');
    $scope.user = user;
    $scope.logout = function() {
      Auth.$unauth();
    };
    $scope.messages = [];
    var profile = $firebaseObject(Ref.child('users/' + user.uid));
    profile.$bindTo($scope, 'profile');


  });
