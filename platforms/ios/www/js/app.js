var ionicSelect = angular.module('ionicSelect',[]);

ionicSelect.directive('ionSelect',function(){
    'use strict';
    return{
        restrict: 'EAC',
        scope: {
           label:'@',
            labelField:'@',
            provider:'=',
            ngModel: '=?',
            ngValue: '=?',
           
        },
         require: '?ngModel',
         transclude : false,
         replace: false,
        template:
                    '<div class="selectContainer">'
                        +'<label class="item item-input item-stacked-label">' 
                            +'<span class="input-label">{{label}}</span>'
                            +'<div class="item item-input-inset">'
                                +'<label class="item-input-wrapper">'
                                    +'<i class="icon ion-ios7-search placeholder-icon"></i>'
                                    +'<input id="filtro" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>'
                                +'</label>'
                                +'<button class="button button-small button-clear" ng-click="open()">'
                                    +'<i class="icon ion-chevron-down"></i>'
                                +'</button>'
                            +'</div>' 
                        +'</label>'
                        +'<div class="optionList padding-left padding-right" ng-show="showHide">'
        +'<ion-scroll>'
                            +'<ul class="list">'
        +'<li class="item" ng-click="selecionar(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}}</li>'                    
                            +'</ul>'
        +'</ion-scroll>'
                        +'</div>'    
                    +'</div>'
             ,
        link: function (scope, element, attrs,ngModel) {
            scope.ngValue = scope.ngValue !== undefined ? scope.ngValue :'item';
            
            scope.selecionar = function(item){
                ngModel.$setViewValue(item);
                scope.showHide = false;
            };
            
            element.bind('click',function(){
                element.find('input').focus();
            });
            
            scope.open = function(){
                
                  scope.ngModel = "";  
                return scope.showHide=!scope.showHide;
            };
            
            scope.onKeyDown = function(){
                scope.showHide = true;
                if(!scope.ngModel){
                     scope.showHide = false;
                }
            }
            
            scope.$watch('ngModel',function(newValue){
                if(newValue)
           element.find('input').val(newValue[scope.labelField]);
               
            });
        },
    };
});



// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var count = 0 ;
var arr;
var rate = [];
var rating;
var id = 0;

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionicSelect'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
  $ionicConfigProvider.navBar.alignTitle("center"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

  $stateProvider

  //   .state('app', {
  //   url: '/app',
  //   abstract: true,
  //   templateUrl: 'templates/menu.html',
  //   controller: 'AppCtrl'
  // })

  // .state('app.search', {
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })

  // .state('app.home', {
  //     url: '/home',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/home.html'
  //       }
  //     }
  //   })
  //   // .state('app.playlists', {
  //   //   url: '/playlists',
  //   //   views: {
  //   //     'menuContent': {
  //   //       templateUrl: 'templates/playlists.html',
  //   //       controller: 'PlaylistsCtrl'
  //   //     }
  //   //   }
  //   // })
  //   .state('app.sessions', {
  //     url: "/sessions",
  //     views: {
  //         'menuContent': {
  //             templateUrl: "templates/sessions.html",
  //             controller: 'SessionsCtrl'
  //         }
  //     }
  //   })

  // // .state('app.single', {
  // //   url: '/playlists/:playlistId',
  // //   views: {
  // //     'menuContent': {
  // //       templateUrl: 'templates/playlist.html',
  // //       controller: 'PlaylistCtrl'
  // //     }
  // //   }
  // // });
  // .state('app.session', {
  //   url: "/sessions/:sessionId",
  //   views: {
  //       'menuContent': {
  //         templateUrl: "templates/session.html",
  //         controller: 'SessionCtrl'
  //       }
  //     }
  // });

  //  .state('app', {
  //   url: '/app',
  //   abstract: true,
  //   templateUrl: 'templates/menu.html',
  //   controller: 'AppCtrl'
  // })

  .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'studentCheckCtrl'
        }
      }
    })
    .state('tabs.studentdetails', {
      url: "/studentdetails",
      views: {
        'home-tab': {
          templateUrl: "templates/studentdetails.html"
        }
      }
    })
    .state('tabs.mainmenu', {
      url: "/mainmenu",
      views: {
        'home-tab': {
          templateUrl: "templates/mainmenu.html"
        }
      }
    })
    .state('tabs.InvoicesMain', {
      url: "/InvoicesMain",
      views: {
        'home-tab': {
          templateUrl: "templates/InvoicesMain.html"
        }
      }
    })
    .state('tabs.instructorFeedback', {
      url: "/instructorFeedback",
      views: {
        'home-tab': {
          templateUrl: "templates/instructorFeedback.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "templates/facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })
    .state('tabs.invoicemenu', {
      url: "/invoicemenu",
      views: {
        'contact-tab': {
          templateUrl: "templates/InvoicesMain.html"
        }
      }
    })
    .state('tabs.producemenu', {
      url: "/producemenu",
      views: {
        'contact-tab': {
          templateUrl: "templates/ProduceMain.html"
        }
      }
    })
    .state('tabs.clientmenu', {
      url: "/clientmenu",
      views: {
        'contact-tab': {
          templateUrl: "templates/ClientsMain.html"
        }
      }
    });



  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/home');
     $urlRouterProvider.otherwise("/tab/home");

})

.service('apiService', function() {
  var apiService = this;
  apiService.sharedObject = {};

  apiService.getStudentInfo = function(){
     return apiService.sharedObject;
  }

  apiService.setStudentInfo = function(value){
     apiService.sharedObject = value;
  }
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})



 .controller('qaCtrl', function($scope, $http,$state) {
 $scope.rate = {};
 $scope.result = arr[count];
 var date = new Date(); 
 var student = 0;
 var Week = 0; 
 
  


  $scope.check = function() {
  rating  = $scope.rate.value;
  

   
              if(rate.length == 0){
              if(rate[count]== undefined ){
       
        id = arr[count].question_id;
        rate.push({question_id:id,question:arr[count],rating:rating,date:date,student_reg_no:student,week : Week});
        $scope.rate.value = 0;
        count = count +1 ;
       
        
        $scope.result = arr[count];

              

              } else{ 
                 
         rate[count].rate = rating ;
        
         count = count +1 ;
         id = arr[count].question_id;
         
                    $scope.result = arr[count];
       

}  
      
    }
              else{
                 if(rate[count]== undefined ){
                id = arr[count].question_id;
                rate.push({question_id:id,question:arr[count],rating:rating,date:date,student_reg_no:student,week:Week});
                $scope.rate.value = 0;
                 
                count = count +1 ;
               
                
               if(count>arr.length-1){
                console.log("done");

                //post request 



var request = {
   method: 'POST',
   contentType:'application/json',
   url: 'https://script.google.com/macros/s/AKfycbwHaGlRE6Lk_S2BnnQ6ed4oBloTOOeKJHBJLPaEcdEhQncCga_G/exec?results=' +rate,
   headers: {'Content-Type': undefined},
   //data: { test: 'test' }
};

$http(request).then(function(response) {
  console.log(response);
}, function(error) {
  alert("error");
});



               

              } else{
              $scope.result = arr[count];
              }


                 }

                 else{
                   rate[count].rate = rating ;
                   console.log("ok r" +rate[count]);
                   count = count +1 ;
                   
                    $scope.result = arr[count];
                 }
            
               
              
              }
              
            


  console.log(rate);     

  
        
      

  };

  $scope.back = function() {

              if(rate.length == 0){
        $scope.result = arr[count];
                  }
              else{
               if(count<0){
                console.log("low");
               


              } else{
                 count = count -1 ;
                 $scope.rate.value = 0;
              if(count == -1 ){
                  alert("There is no");
              }else{

console.log(rate[count]);
$scope.rate.value = rate[count].rate;
                
              }
             
              $scope.result = arr[count];
              }
               
              
              }
              
 // console.log(rate);
   console.log(count);     
      

  };
  
  
 
})

.controller('BarcodeCtrl', function($scope, $cordovaBarcodeScanner, $http, $state, $ionicLoading, apiService) {

    $scope.APIresponse = apiService.getStudentInfo();


      // verifyQRCode(2);

       if(!arr){
           $http.get("https://script.google.com/macros/s/AKfycbwCBI06okNRN5Ms22i5Aj6Ej_gBi1NimtPKQ4M31y2eq8qyYEU/exec", {})
    .success(function (response) {
                if (response.hasError) {
                  console.log("Error")
                } else {
                  console.log("Success")
                  console.log(response.data)
                 arr = response.data;
               
              
                }

            })
    .error(function (response) {
              console.log("Response error")
              console.log(response)
               
            });
       }             
  
  

  
   

})

.controller('StudentDetailsCtrl', function($scope, $cordovaBarcodeScanner, $http, $state, $ionicLoading, apiService) {

    $scope.APIresponse = apiService.getStudentInfo();


})

.controller('studentCheckCtrl', function($scope, $http,$state, $cordovaBarcodeScanner, $ionicLoading, apiService) {

$scope.show = false;
  // verifyQRCode("y8y89y9");
 
  $scope.barcodeVal = 4242243;

  verifyQRCode($scope.barcodeVal);

  // openBarcodeScanner();
 
  // document.addEventListener("deviceready", function () {
  //   openBarcodeScanner();
  // }, false);

 $scope.test = function(modVal){
          console.log(modVal);
        }

  function loadStudentInformation(){

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $http.get("https://script.google.com/macros/s/AKfycbwym9Io9DP7VJHlcypXa8bJ-5DhfXr-DzrvMszDkVr548a_bqkW/exec")
    .then(function(response) {
        $scope.status = "false";
        $ionicLoading.hide();

        $scope.students = response.data;
        console.log($scope.students);

        var data  = response.data.data;
        $scope.studentsdata = data;

         $scope.addQrCodetoStudent = function(modVal){

          $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });

          console.log(modVal);

 
          var requrl = "https://script.google.com/macros/s/AKfycbwym9Io9DP7VJHlcypXa8bJ-5DhfXr-DzrvMszDkVr548a_bqkW/exec?qrcode="+ $scope.barcodeVal +"&regno="+modVal.reg_no;

          $http.get(requrl)
          .then(function(response) {
              console.log(response);
              $ionicLoading.hide();

              $state.go('tabs.mainmenu');

          });  

        }
    });
  }

  function openBarcodeScanner(){
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        alert(barcodeData.text);
        $scope.barcodeVal = barcodeData.text;
        verifyQRCode($scope.barcodeVal);
        // Success! Barcode data is here
      }, function(error) {
        // An error occurred
      });


    // NOTE: encoding not functioning yet
    $cordovaBarcodeScanner
      .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
      .then(function(success) {
        // Success!
      }, function(error) {
        // An error occurred
      });
  }

  function verifyQRCode(qrcode) {

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $http.get("https://script.google.com/macros/s/AKfycbwym9Io9DP7VJHlcypXa8bJ-5DhfXr-DzrvMszDkVr548a_bqkW/exec?qrcode="+qrcode, {})
    .success(function (response) {

                if (response.hasError) {
                  console.log("Error")
                } else {
                  console.log("Success")

                   $ionicLoading.hide();
                 
                   faq = response.infos;
                   console.log(response.infos);
                   $scope.APIresponse = response.infos;
                   console.log(response);
                  
                    if($scope.APIresponse.length!=0){
                      
                      apiService.setStudentInfo($scope.APIresponse);

                      $state.go('tabs.mainmenu');
                    }else if($scope.APIresponse.length==0){
                      $scope.show = true;

                      loadStudentInformation();
                    }
                }

            })
    .error(function (response) {
              console.log("Response error")
              console.log(response)
               
            });
   };

});
