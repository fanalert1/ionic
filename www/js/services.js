angular.module('starter.services',[])
    .factory('loadingService', function($http,$ionicLoading){
        

    return {
            show: function() {
              $ionicLoading.show({
               template: 'Loading...'
              });
             },

             hide: function() {
              $ionicLoading.hide();
            }
          };
  
    });