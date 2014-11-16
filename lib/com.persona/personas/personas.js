var module = angular.module('com.persona.personas', []);

module.controller('personaCtrl', function($scope, $stateParams, Personas, Persona) {
    $scope.personas = Personas.all();
});

module.factory('Personas', function(Persona) {

    var state = {
      persona:undefined,
      set: function(key, obj){
        state[key] = obj;
      }
    }

    var personas = [];
    var query = Persona.query().then(function(data){
      angular.forEach(data, function(persona, i){
        persona.initials = Persona.initials(persona);
        personas.push(persona);
      });
      state.persona = personas[0];
      console.log(personas);
    }).catch(function(error){
      console.log("could not load personas", error);
    });


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
      return state.persona;
    }

    return self;

});

// Models
module.factory('Persona', function($resource, PromisesOnly){

  var URL = 'http://localhost:8000/personas/:personaId';
  var resource = $resource(URL, {personaId:'@id', format:'json'});

  // Return object
  var self = PromisesOnly.decorate(resource);

  // Static methods
  self.initials = function(persona){
    var articles = ["a", "the"];
    var words = persona.name.split(" ");
    var i = 0;
    while(articles.indexOf(words[i].toLowerCase()) > -1){
      i++;
    }
    var text = words[i].toUpperCase().slice(0,2);
    return text;
  }
  
  return self;

});
