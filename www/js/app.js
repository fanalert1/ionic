// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services', 'ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform,$state,$ionicPopup) {
  $ionicPlatform.ready(function() {

     //$state.go('app.intro');

     if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                   //$state.go('app.intro');
                    $ionicPopup.confirm({
                        title: "No Internet Connection",
                        content: "Please connect to the internet and open the app again"
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                        if(result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    ionic.Platform.fullScreen()

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
      StatusBar.hide();
    }
   //vbv77 StatusBar.hide();



   Parse.initialize("12345", "12345");
   Parse.serverURL = 'http://128.199.141.102:8080/parse';

   //var session_data = Parse.User.current();
   if(Parse.User.current() != null)
    {
        //alert("you are already logged in!!"+Parse.User.current().get("token"));

        var io = Ionic.io();
        var push = new Ionic.Push({
          "onNotification": function(notification) {
             var payload = notification.payload;
             //console.log(notification, payload);
             alert(payload.title+" - "+payload.message+". Click ok to book");
             //$state.go('app.movie',{movie_id:id});
             $state.go('app.movie',{movie_id:payload.movie_id});
          },
          "pluginConfig": {
            "android": {
             // "iconColor": "white",
              "icon": "icon"
            }
          }
        });
        push.register(callback);
        var callback = function(data) {
         // alert("Device token:",data.token);
       }
      //console.log(Parse.User.current().get("token"));
      $state.go('app.running');
    }
   else
    {
      $state.go('app.intro');
    }


        /*
        var user = Ionic.User.current();
        
        if (!user.id) {
          user.id = Ionic.User.anonymousId();
        }
        
        // Just add some dummy data..
        user.set('name', 'BABY BOY');
        user.set('bio', 'This is my little bio');
        user.save();
       
        var callback = function(data) {
          push.addTokenToUser(user);
          user.save();
        };
        push.register(callback);

  */


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/rubyonic/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.intro', {
    url: '/intro',
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/intro.html",
        controller: 'LoginCtrl'
      }
    },
  })

  .state('app.feed', {
    url: '/feed',
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/feed.html",
        controller: 'FeedCtrl'
      }
    },
  })


  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/signup.html",
        controller: 'LoginCtrl'
      }
    },
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/rubyonic/login.html',
        controller: 'LoginCtrl'
      }
    },
  })

  .state('app.forgot', {
    url: '/forgot',
    views: {
      'menuContent': {
        templateUrl: 'templates/rubyonic/forgot.html',
        controller: 'LoginCtrl'
      }
    },
    
  })

  .state('app.movie', {
    url: "/movie/:movie_id",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/view-movie.html",
        controller: 'MovieDetailCtrl'
      }
    },

  })

  .state('app.running', {
    url: "/running",
    params: {
        'type':'running'
    },
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/movies-list.html",
        controller: 'MovieCtrl'
      }
    },

  })


  .state('app.upcoming', {
    url: "/upcoming",
    params: {
        'type':'upcoming'
    },
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/movies-list.html",
        controller: 'MovieCtrl'
      }
    },

  })


  .state('app.upcoming_open', {
    url: "/upcoming_open",
    params: {
        'type':'upcoming_open'
    },
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/movies-list.html",
        controller: 'MovieCtrl'
      }
    },

  })

  .state('app.all', {
    url: "/all",
    params: {
        'type':'all'
    },
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/movies-list.html",
        controller: 'MovieCtrl'
      }
    },

  })

 /*
  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/login.html"
      }
    }
  })
*/
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })

/*
  .state('app.forms', {
    url: "/forms",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/forms.html"
      }
    }
  })

  .state('app.feed', {
    url: "/feed",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/feed.html"
      }
    }
  })

  .state('app.chat-list', {
    url: "/chat-list",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/chat-list.html"
      }
    }
  })

  .state('app.chat-ui', {
    url: "/chat-ui",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/chat-ui.html"
      }
    }
  })

  .state('app.view-post', {
    url: "/view-post",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/view-post.html"
      }
    }
  })

  .state('app.tinder-one', {
    url: "/tinder-one",
    views: {
      'menuContent': {
        templateUrl: "templates/tinder/tinder-one.html"
      }
    }
  })

  .state('app.tinder-two', {
    url: "/tinder-two",
    views: {
      'menuContent': {
        templateUrl: "templates/tinder/tinder-two.html"
      }
    }
  })

  .state('app.tinder-three', {
    url: "/tinder-three",
    views: {
      'menuContent': {
        templateUrl: "templates/tinder/tinder-three.html"
      }
    }
  })

  .state('app.tinder-four', {
    url: "/tinder-four",
    views: {
      'menuContent': {
        templateUrl: "templates/tinder/tinder-four.html"
      }
    }
  })

*/
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/running');
});
