angular.module('starter.controllers', [])


.controller('ProfileCtrl', function($scope, $state) {

  $scope.data = {};

  $scope.session_data = Parse.User.current();
  $scope.user_id=$scope.session_data.id;
  $scope.token=Parse.User.current().get("token");
  $scope.email=Parse.User.current().getEmail();
  $scope.user_name=Parse.User.current().getUsername();


  })

.controller('LoginCtrl', function($scope, $state, $http, $ionicLoading) {
 
  $scope.data = {};

  if(Parse.User.current() != null)
    {
      alert("you are already logged in!!");
      $state.go('app.profile');
    }

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.welcome = function(user){
          
          console.log(user);
          console.log(user.get("token"));
          user_token=user.get("token");
          user_name=Parse.User.current().getUsername();
        // Define relevant info
          var privateKey = '03dc4c7c7df366924285ec8ed1094a5efcbe90235dac3bcb';
          var tokens = [user_token];
          var appId = '79818019';

          // Encode your key
          var auth = btoa(privateKey + ':');

          // Build the request object
          var req = {
            method: 'POST',
            url: 'https://push.ionic.io/api/v1/push',
            headers: {
              'Content-Type': 'application/json',
              'X-Ionic-Application-Id': appId,
              'Authorization': 'basic ' + auth
            },
            data: {
              "tokens": tokens,
              "notification": {
                "title": "Hello "+user_name,
                "alert": "Welcome to FanAlert. You will be notified instantly when movie bookings open.",
                "android":{
                  "collapseKey":"foo8",
                  "delayWhileIdle":true,
                  "timeToLive":100,
                  "payload":{
                     "title": "Hello "+user_name,
                     "message": "Welcome to FanAlert. You will be notified instantly when movie bookings open."
                  }
                }
              }
            }
          };

          // Make the API call
          $http(req).success(function(resp){
            // Handle success
            console.log("Ionic Push: Push success!");
          }).error(function(error){
            // Handle error 
            console.log("Ionic Push: Push error...");
          });

  }
 /*
  $scope.session_data = Parse.User.current();
  if($scope.session_data.id != null)
  {

    alert("you are already Registered!!");
    //$state.go('profile');
  }
 */
     $scope.signupEmail = function(){
     
      //get device token first

        $scope.show();

        var io = Ionic.io();
        var push = new Ionic.Push({
          "onNotification": function(notification) {
             var payload = notification.payload;
             //console.log(notification, payload);
             alert(payload.title+" - "+payload.message);
             //$state.go('app.upcoming');
          },
          "pluginConfig": {
            "android": {
             // "iconColor": "white",
              "icon": "icon"
            }
          }
        });
        //var user = Ionic.User.current();
        
        //if (!user.id) {
        //  user.id = Ionic.User.anonymousId();
        //}
        
        // Just add some dummy data..
        // user.set('name', 'RUBY BOY');
        // user.set('bio', 'This is my little bio');
        // user.save();
       
        var callback = function(data) {
          //push.addTokenToUser(user);
         // user.save();
          console.log("Device token:",data.token);
                //Create a new user on Parse
          var user = new Parse.User();
          user.set("username", $scope.data.username);
          user.set("password", $scope.data.password);
          user.set("email", $scope.data.email);
         
          // other fields can be set just like with Parse.Object
          user.set("token", data.token);

         
          user.signUp(null, {
            success: function(user) {
              // Hooray! Let them use the app now.
              $scope.welcome(user);
              $scope.hide();
              alert("You are successfully registered!");

              $state.go('app.profile');
            },
            error: function(user, error) {
              // Show the error message somewhere and let the user try again.
              $scope.hide();
              alert("Error: " + error.code + " " + error.message);
            }
          });
        };

        push.register(callback);



     
    };
 
    $scope.loginEmail = function(){
      $scope.show();
      var io = Ionic.io();
      var push = new Ionic.Push({
          "onNotification": function(notification) {
             var payload = notification.payload;
             //console.log(notification, payload);
             alert(payload.title+" - "+payload.message);
             //$state.go('app.upcoming');
          },
          "pluginConfig": {
            "android": {
             // "iconColor": "white",
              "icon": "icon"
            }
          }
        });



      var callback = function(data) {
          //push.addTokenToUser(user);
         // user.save();
          console.log("Device token:",data.token);
                //Create a new user on Parse
          var user = Parse.User.current();
        
         
          // other fields can be set just like with Parse.Object
          user.set("token", data.token);

          user.save(null, {
            success: function(user) {
              // Hooray! Let them use the app now.
              $scope.welcome(user);
              $scope.hide();
              //alert("You are successfully logged in..");
              $state.go('app.profile');
            },
            error: function(user, error) {
              // Show the error message somewhere and let the user try again.
              $scope.hide();
              alert("Error: " + error.code + " " + error.message);
            }
          });
        
         // $scope.welcome(user);
         
        };


      Parse.User.logIn($scope.data.username, $scope.data.password, {
        success: function(user) {
          // Do stuff after successful login.
          //console.log(user);
          push.register(callback);
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          $scope.hide();
          alert("error!");
        }
      });
    };


    $scope.checkEmail = function(email)
    {
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");

        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) 
        {
            return false;
        }
        return true;
    }

    $scope.resetPassword = function()
    {           
        //var email = document.forms["resetpassword"]["email"].value;
        var email = $scope.data.email;
        var emailIsValid = $scope.checkEmail(email);

        if (!emailIsValid)
        {
            window.alert("Not a valid e-mail address");
            return false;
        }

        Parse.User.requestPasswordReset(email, {
                    success:function() {
                        window.alert("Password reset link has been sent to "+ email);
                        $state.go('app.login');
                        return true;
                    },
                    error:function(error) {
                        window.alert(error.message);
                        return false;
                    }
                });
    }


   


 
})


.controller('FeedCtrl', function($scope, $http, $state, $ionicScrollDelegate, loadingService) {


       loadingService.show();
       $scope.events = [];
     // $scope.title = "";
       url='http://128.199.141.102:8080/api/events';
       //$scope.movie = {"name":url}; 
       $http.get(url).
            success(function(data) {
             // $scope.events = data;
            //$scope.events = JSON.stringify(data); //try JSON.parse for js string to json
            //$scope.events = JSON.parse($scope.events);
           $scope.events = data;
            console.log($scope.events);
            //console.log(data);
              loadingService.hide();
            });


        $scope.goMoviePage = function (id) {
            //window.open(path);
            //window.open(path, '_system', 'location=yes');
            $state.go('app.movie',{movie_id:id});
          };  
     // console.log("events:"+$scope.events);
})

.controller('MovieDetailCtrl', function($scope, $stateParams, $http, $state, $ionicScrollDelegate, loadingService) {


      loadingService.show();
      $scope.movie = [];
      $scope.title = "";


      if($stateParams.movie_id!="")
      {
       url='http://128.199.141.102:8080/api/movies/id/'+$stateParams.movie_id;
       //$scope.movie = {"name":url};
       //console.log(url);
       
       $http.get(url).
            success(function(data) {
              //data = data[]
              $scope.movie = data[0];
             // console.log($scope.movie["source"]);
              $scope.source = $scope.movie["source"];

              for(var i=0;i<$scope.source.length;i++){
                var obj = $scope.source[i];
                //console.log(obj);
                /*for (x in obj) {
                  console.log(x);
                  if(x=="bms")
                   var bms_link =  obj[x]["link"];
                  else
                   var tn_link = obj[x]["link"];
                }*/
                if(obj.source=="bms")
                  $scope.bms_link=obj.link;
                else if(obj.source=="tktnew")
                  $scope.tn_link=obj.link;
              }

              $scope.title = "Movie Details";
              loadingService.hide();
            });

      }

       $scope.go = function(link) {
           
            console.log(link);
            if(link=="tn")
            window.open($scope.tn_link, '_system', 'location=yes');
            else if(link=="bms")
            window.open($scope.bms_link, '_system', 'location=yes');
            
      };   


})





.controller('MovieCtrl', function($scope, $stateParams, $http, $state, $ionicScrollDelegate, filterFilter, loadingService) {
  
  loadingService.show();
  $scope.movies = [];
  $scope.all_movies = [];
  $scope.movie = [];
  $scope.title = "";
  $scope.lang = "";

/*
  if($stateParams.movie_name!="")
  {
   url='http://128.199.141.102:8080/api/movies/name/'+$stateParams.movie_name;
   //$scope.movie = {"name":url};
   console.log(url);
   
  $http.get(url).
        success(function(data) {
         // console.log(data[0]);
          $scope.movie = data[0];
          //console.log($scope.movie);
         // $scope.link = $scope.link;
          $scope.title = "Movie Details";
           
           //console.log(data);
        });

  }
*/
  
  if($stateParams.type=="all")
  {
   
  $http.get('http://128.199.141.102:8080/api/movies').
        success(function(data) {
          
          $scope.all_movies = data;

          $scope.title = "All Movies";

          $scope.lang = "Tamil"
          $scope.movies = filterFilter($scope.all_movies, {lang: $scope.lang}); // by attribute
          $scope.tamilTab = "tab-item tab-item-active";
          $scope.hindiTab = "tab-item";
          $scope.englishTab = "tab-item";
          $scope.othersTab = "tab-item";
           //console.log(data);
           loadingService.hide();
        });

  }
  
  
  if($stateParams.type=="upcoming")
  {
   
  $http.get('http://128.199.141.102:8080/api/movies/upcoming').
        success(function(data) {
          
          $scope.all_movies = data;
         // console.log("Movies:"+$scope.all_movies);
          $scope.title = "Coming Soon";
          console.log(data);

          $scope.lang = "Tamil"
          $scope.movies = filterFilter($scope.all_movies, {lang: $scope.lang}); // by attribute
          $scope.tamilTab = "tab-item tab-item-active";
          $scope.hindiTab = "tab-item";
          $scope.englishTab = "tab-item";
          $scope.othersTab = "tab-item";
           
           //console.log(data);
           loadingService.hide();
        });

  }

  if($stateParams.type=="upcoming_open")
  {
   
  $http.get('http://128.199.141.102:8080/api/movies/upcoming_open').
        success(function(data) {
          
          $scope.all_movies = data;
          $scope.title = "Upcoming";
          console.log(data);

          $scope.lang = "Tamil"
          $scope.movies = filterFilter($scope.all_movies, {lang: $scope.lang}); // by attribute
          $scope.tamilTab = "tab-item tab-item-active";
          $scope.hindiTab = "tab-item";
          $scope.englishTab = "tab-item";
          $scope.othersTab = "tab-item";
           
           //console.log(data);
           loadingService.hide();
        });

  }
  
  
  if($stateParams.type=="running")
  {
   
  $http.get('http://128.199.141.102:8080/api/movies/running').
        success(function(data) {
          
          $scope.all_movies = data;
          $scope.title = "Now Showing";

          $scope.lang = "Tamil"
          $scope.movies = filterFilter($scope.all_movies, {lang: $scope.lang}); // by attribute
          $scope.tamilTab = "tab-item tab-item-active";
          $scope.hindiTab = "tab-item";
          $scope.englishTab = "tab-item";
          $scope.othersTab = "tab-item";
           
           //console.log(data);
           loadingService.hide();
        });

  }

 

  $scope.changeLang = function (lang) {
      
      $ionicScrollDelegate.scrollTop();
      $scope.lang = lang;
      //$scope.lang2 = lang;
      if (lang=="Tamil")
      {  
         $scope.movies = filterFilter($scope.all_movies, {lang: $scope.lang});
         $scope.tamilTab = "tab-item tab-item-active";
         $scope.hindiTab = "tab-item";
         $scope.englishTab = "tab-item";
         $scope.othersTab = "tab-item";

      }
      if (lang=="Hindi")
      {
         $scope.movies = filterFilter($scope.all_movies, {lang: $scope.lang});
         $scope.hindiTab = "tab-item tab-item-active";
         $scope.tamilTab = "tab-item";
         $scope.englishTab = "tab-item";
         $scope.othersTab = "tab-item";
      }
      if (lang=="English")
      {
         $scope.movies = filterFilter($scope.all_movies, {lang: $scope.lang});
         $scope.englishTab = "tab-item tab-item-active";
         $scope.tamilTab = "tab-item";
         $scope.hindiTab = "tab-item";
         $scope.othersTab = "tab-item";
      }
      if (lang=="Others")
      {
         $scope.movies1 = filterFilter($scope.all_movies, {lang: 'Telugu'});
         $scope.movies2 = filterFilter($scope.all_movies, {lang:'Malayalam'});
         $scope.movies3 = filterFilter($scope.all_movies, {lang:'Kannada'});
         
         $scope.movies4 = $scope.movies1.concat($scope.movies2);
         $scope.movies = $scope.movies4.concat($scope.movies3);
         $scope.othersTab = "tab-item tab-item-active";
         $scope.tamilTab = "tab-item";
         $scope.hindiTab = "tab-item";
         $scope.englishTab = "tab-item";
      }
    //console.log($scope.searchText);
    //window.open(path);
    //path="http://www.google.com";
    //console.log("path1"+path1);
    //window.open(path1, '_system', 'location=yes');
  };    


   $scope.go = function (source,site) {
          var arr = JSON.parse(source);
          console.log(arr.length);
          for(var i=0;i<arr.length;i++){
                var obj = arr[i];
                //console.log(obj);
                /*for (x in obj) {
                  console.log(x);
                  if(x=="bms")
                   var bms_link =  obj[x]["link"];
                  else
                   var tn_link = obj[x]["link"];
                }*/
                if(obj.source=="bms")
                  bms_link=obj.link;
                 
                else if(obj.source=="tktnew")
                  tn_link=obj.link;


            }
          console.log(bms_link);
          console.log(tn_link)
          if(site=="bms")
          window.open(bms_link, '_system', 'location=yes');
          else if(site=="tn")
          window.open(tn_link, '_system', 'location=yes');
        
      };    


  $scope.goMoviePage = function (id) {
    //window.open(path);
    //window.open(path, '_system', 'location=yes');
    $state.go('app.movie',{movie_id:id});
  };      
  
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('NavigationCtrl', function($scope, $state,$ionicHistory) {

  // Function to go states. We're using ng-click="go('app.state')" in all our anchor tags
  $scope.go = function(path){
      // console.log('working. Click was Triggered');
      $state.go(path);
      console.log($ionicHistory.viewHistory());
  }

  $scope.logout = function(){
      // console.log('working. Click was Triggered');
      //$state.go(path);
      //console.log($ionicHistory.viewHistory());
      Parse.User.logOut();
      alert("Logged out");
      // $state.go("app.login");
      ionic.Platform.exitApp();

  }

  //Function to go back a step using $ionicHistory
  $scope.goBackAStep = function(){
      console.log('clicked');
      $ionicHistory.goBack();

  }

})


.controller('JCardsCtrl', function($scope) {
  console.log('CARDS CTRL Initiated');
   var cardTypes = [
    { 
      image: 'img/demo/tinder-full-pic.jpg', 
      title: 'Samantha Gamblesx', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : false
    },
    { 
      image: 'img/demo/tinder-full-pic-2.jpg', 
      title: 'Junior Max', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : true
    },
    { 
      image: 'img/demo/tinder-full-pic-3.jpg', 
      title: 'Karla Valentine', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : true
    }
  ];

  $scope.cardsControl = {};
  
  $scope.reload = function() {
    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    //we'll need to have a counter for the cards deck
    $scope.cardCounter = $scope.cards.length;

    //we'll need a variable to tell us if the deck is empty or full. since we're reloading, default is false
    $scope.deckIsEmpty = false;

    //we'll clone our $scope.cards for our own custom functions (like counting and exposing card data)
    $scope.cardDataArray = $scope.cards.slice(0);

    //If a card is swyped, its details will always be here. if we are resetting/updating the stack, 
    // this variable will be reset. refer to the $scope.exposeSwypedCard function
    $scope.swypedCard = null;

    // debug data
    console.log('cards in deck: '+$scope.cards.length);
  }

  $scope.exposeSwypedCard = function() {
    //since a card has been removed from deck, reduce counter by 1 
    //we're doing this to balance the 0-notation of arrays vs the array.lenght
    $scope.cardCounter -= 1;

    //if deck is empty set variable to true
    if ($scope.cardCounter === 0){
      $scope.deckIsEmpty = true;
      console.log('deck is empty!');
    }
    

    //we'll use the cardCounter as the index in our cloned array for that card's 
    //data
    $scope.swypedCard = $scope.cardDataArray[$scope.cardCounter];


    //output to console. use to your preference
    console.log($scope.swypedCard);
  }

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };
  
  $scope.yesClick = function() {
    $scope.cardsControl.swipeRight();
  };
  
  $scope.noClick = function() {
    $scope.cardsControl.swipeLeft();
  };
  
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.exposeSwypedCard();
  };
  
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.exposeSwypedCard();
  };

  $scope.cardDetails = function(card) {

  }
  
  $scope.reload()
});