var module = angular.module('com.persona.groups', []);

// Router
module.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    //This is a hack. This should app.groups, but the inheritence isn't working

    .state('groups', {
      url: "/app/groups",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('groups.list', {
      url: "",
      views: {
        'menuContent' :{
          templateUrl: "lib/com.persona/groups/groups.html",
          controller: 'GroupsCtrl'
        }
      }
    })

    .state('groups.new', {
      url: "/new",
      views: {
        'menuContent' :{
          templateUrl: "lib/com.persona/groups/form.html",
          controller: 'GroupsCtrl'
        }
      }
    })

    .state('groups.detail', {
      url: "/:groupId",
      views: {
        'menuContent' :{
          templateUrl: "lib/com.persona/groups/group.html",
          controller: 'GroupCtrl'
        }
      }
    });

});


// Controller - List
module.controller('GroupsCtrl', function($scope, $state, Groups, Messages) {
  $scope.groups = Groups.all();
  angular.forEach($scope.groups, function(group, i){
    group.preview = Messages.last(group._id) || {text:''};
  });

  $scope.go = function(url, params){
    $state.go(url, params);
  }

})


// Controller - View
module.controller('GroupCtrl', function($scope, $stateParams, $ionicScrollDelegate, Personas, Message, Messages, Groups) {
  
  $scope.scroll = function(){
    $ionicScrollDelegate.scrollBottom(true)
  };

  $scope.newMessage = "";
  $scope.group = Groups.get($stateParams.groupId);
  $scope.messages = Messages.get($scope.group._id);

  $scope.post = function(){
    var message = new Message({
      author: Personas.current(),
      text: $scope.newMessage,
      timestamp: new Date(),
      group_id: $scope.group._id
    });
    Messages.post(message);
    $scope.messages.push(message);
    $scope.newMessage = "";
    $ionicScrollDelegate.scrollBottom(true);
  }
  
});


// Service
module.factory('Groups', function(Group) {

    var groups = [
      new Group({_id:0, title:'Cloud Computing'}),
      new Group({_id:1, title:'A Novel Experience'}),
      new Group({_id:2, title:'MAD'}),
      new Group({_id:3, title:'Ideas'})
    ];

    return {
      all : function(){
        return groups;
      },
      get : function(index){
        return groups[index];
      }
    };

});


// Models
module.factory('Group', function(){

  function Group(spec){

    // Prevents global namespace clobbering if you istantiate this object
    // without the 'new' keyword
    if (!(this instanceof Group)) {
      return new Group();
    }

    this._id = Number;
    this.title = String;

    // Initialize object with spec properties, 
    // excluding any that aren't defined above
    var self = this;
    angular.forEach(spec, function(property, key){
      if(self.hasOwnProperty(key)){
        self[key] = property;
      }
    });  
  };

  Group.prototype.initials = function(){
    var articles = ["a", "the"];
    var words = this.title.split(" ");
    var i = 0;
    while(articles.indexOf(words[i].toLowerCase()) > -1){
      i++;
    }
    var text = words[i].toUpperCase().slice(0,2);
    return text;
  }

  return Group;

});