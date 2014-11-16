var module = angular.module('com.persona.utils', []);

module.factory('PromisesOnly', function() {

  return {
    decorate:function(resource){
      return {
        query : function(){ return resource.query().$promise},
        get : function(){ return resource.get().$promise},
        save : function(){ return resource.save().$promise},
        remove : function(){ return resource.remove().$promise},
        delete : function(){ return resource.delete().$promise}
      }
    }
  }

});
