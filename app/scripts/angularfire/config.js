angular.module('firebase.config', [])
  .constant('FBURL', 'https://flickering-heat-6442.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['anonymous'])

  .constant('loginRedirectPath', '/login');
