var module = angular.module('com.persona.messages', []);

// Model
module.factory('Message', function(){

  function Message(spec){

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Message)) {
      return new Message();
    }

    this._id = Number;
    this.group_id = Number;
    this.text = String;
    this.author = String;
    this.timestamp = Date;

    // Initialize object with spec properties, 
    // excluding any that aren't defined above
    var self = this;
    angular.forEach(spec, function(property, key){
      if(self.hasOwnProperty(key)){
        self[key] = property;
      }
    });  
  };

  return Message;

});

// Service
module.factory('Messages', function(Message) {

    var messages = [
      new Message({
        author:'Eric',
        text: "Hey, send me the AMI for the mySQL server",
        group_id: 0,
        timestamp: new Date()
      }),
      new Message({
        author:'Charles',
        text: "am1-2423423",
        group_id: 0,
        timestamp: new Date()
      }),
      new Message({
        author:'Victor',
        text: "We have 170,000 rows in MySql",
        group_id: 0,
        timestamp: new Date()
      }),
      new Message({
        author:'Victor',
        text: "220,000",
        group_id: 0,
        timestamp: new Date()
      }),
      new Message({
        author:'Eric',
        text: "I'm working on the HBase table",
        group_id: 0,
        timestamp: new Date()
      }),
      new Message({
        author:'Victor',
        text: "We have 170,000 rows in MySql",
        group_id: 0,
        timestamp: new Date()
      }),
      new Message({
        author:'Victor',
        text: "220,000",
        group_id: 0,
        timestamp: new Date()
      }),
      new Message({
        author:'Eric',
        text: "I'm working on the HBase table",
        group_id: 0,
        timestamp: new Date()
      }),
      new Message({
        author:'Narrator',
        text: "Cricket cricket… silence silence… cricket cricket… silence silence… more silence. \n\nThe gentle music of the crickets had suddenly stopped.\n\nOur father had taught us that we should listen to the voices of nature. When the voices are hushed we must pay attention; if they go silent altogether, then we should be on the alert; and if they never return, we are doomed.\n\nThe aircraft carrier USS Natural Wonder – South Pacific Seas – October, 2020: All hands on deck.\n\nThis is not a drill.",
        group_id: 1,
        timestamp: new Date()
      }),
    ];

    var self = {
      get : function(group_id){
        return messages.filter(function(i){
          return i.group_id === group_id;
        });
      },
      last : function(group_id){
        var ms = self.get(group_id);
        return ms[ms.length - 1];
      },
      post : function(message){
        messages.push(message);
      }
    };

    return self;

});