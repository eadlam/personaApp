var module = angular.module('com.persona.messages', []);

// Service
module.factory('Messages', function(Message) {

    var self = {
      post : function(message){
        messages.push(message);
      }
    };

    return self;

});

// Models
module.factory('Message', function($resource, PromisesOnly){

  var URL = 'http://localhost:8000/messages/:messageId';
  var resource = $resource(URL, {groupId:'@id', format:'json'});

  // Return object
  var self = PromisesOnly.decorate(resource);
  return self;

});