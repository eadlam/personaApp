var module = angular.module('com.persona.personas', []);

module.controller('personaCtrl', function($scope, $stateParams, Personas) {
    $scope.personas = Personas.all();
});

module.factory('Personas', function() {

    var personas = [
      {name:"Eric"},
      {name:"Warren"},
      {name:"Bazil"},
      {name:"Sherlock"}
    ]

    var state = {
      persona:personas[0],
      set: function(key, obj){
        state[key] = obj;
      }
    }

    var self = {
      
    };
    self.all = function(){
      return personas;
    }
    self.get = function(index){
      return personas[index];
    }

    self.state = function(){
      return state;
    }

    self.current = function(){
      return state.persona.name;
    }

    return self;

});
