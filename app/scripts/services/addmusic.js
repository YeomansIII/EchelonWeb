 /*jshint unused:false*/
 'use strict';

 angular.module('webApp')
   .service('addMusicService', function(Firebase) {
     // var newSongUri = null;
     //
     // var setAddNewSong = function(songUri) {
     //   productList.push(songUri);
     // };
     //
     // var getNewSong = function() {
     //   return productList;
     // };

     var ref = new Firebase('https://flickering-heat-6442.firebaseio.com/');
     var uid = ref.getAuth().uid;
     var userRef = ref.child('users/' + uid);
     var groupRef;
     userRef.child('cur_group').on('value', function(dataSnapshot) {
       var dataVal = dataSnapshot.val();
       if (dataVal !== null) {
         groupRef = ref.child('queuegroups/' + dataVal);
       } else {
         groupRef = undefined;
       }
     });

     this.addSongData = function(addObj) {
       if (groupRef !== undefined) {
         console.log(addObj);
         var pushRef = groupRef.child('tracks').push();
         addObj.key = pushRef.key();
         pushRef.set(addObj);
       }
     };

     // return {
     //   addProduct: addProduct,
     //   getProducts: getProducts
     // };

   });
