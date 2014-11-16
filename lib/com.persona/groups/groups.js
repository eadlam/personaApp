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
  
  // Load groups from service
  $scope.groups = Groups.all();

  $scope.go = function(url, params){
    $state.go(url, params);
  }

})


// Controller - View
module.controller('GroupCtrl', function($scope, $stateParams, $ionicScrollDelegate, Personas, Message, Messages, Groups, $http) {
  
  $scope.scroll = function(){
    $ionicScrollDelegate.scrollBottom(true)
  };

  $scope.newMessage = "";
  $scope.group = Groups.get($stateParams.groupId);

  $scope.post = function(){
    
    var message = {
      text: $scope.newMessage,
      group: $scope.group.url,
      persona: Personas.current().url
    };

    var post = $http.post('http://localhost:8000/messages/', message);
    console.log("Saving message", message);
    post.then(function(res){
      $scope.group.messages.push(res.data);
      $ionicScrollDelegate.scrollBottom(true);
    }).catch(function(err){
      console.log("Message not saved", err);
    });
    
    $scope.newMessage = "";
  }
  
});


// Service
module.factory('Groups', function($resource, Group) {

    groups = [];
    var query = Group.query().then(function(data){
      angular.forEach(data, function(group, i){
        group.initials = Group.initials(group);
        group.preview = _.last(group.messages) || {text:''};
        groups.push(group);
      });
    });

    return {
      all : function(){
        return groups;
      },
      get : function(id){
        var gs = groups.filter(function(g){
          return g.id === parseInt(id);
        });
        return gs[0];
      }
    };

});


// Models
module.factory('Group', function($resource, PromisesOnly){

  var URL = 'http://localhost:8000/groups/:groupId';
  var resource = $resource(URL, {groupId:'@id', format:'json'});

  // Return object
  var self = PromisesOnly.decorate(resource);

  // Static methods
  self.initials = function(group){
    var articles = ["a", "the"];
    var words = group.name.split(" ");
    var i = 0;
    while(articles.indexOf(words[i].toLowerCase()) > -1){
      i++;
    }
    var text = words[i].toUpperCase().slice(0,2);
    return text;
  }
  
  return self;

});