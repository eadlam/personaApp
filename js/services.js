// Service
var module = angular.module('starter.services', [])
module.factory('Menu', function() {

    var state = {
      crumb:""
    }

    return {
      set : function(key, value){
        state[key] = value;
      },
      state : function(){
        return state;
      }
    };

});