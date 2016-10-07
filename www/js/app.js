angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionic-ratings'])

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

  .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html"
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


  apiService.getPackInfo = function(){
     return apiService.sharedObject;
  }

  apiService.setPackInfo = function(value){
    apiService.sharedObject = {};

    apiService.sharedObject = value;
  }

  
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})



 

.controller('MainMenuCtrl', function($scope, $cordovaBarcodeScanner, $http, $state, $ionicLoading, apiService,  $ionicPopup) {

    $scope.APIresponse = apiService.getPackInfo();

    console.log($scope.APIresponse);

    $scope.addPackstoStock = function(quantity){
        console.log(quantity);
       if(quantity!="" && quantity!=null && quantity!=undefined){
          var confirmPopup = $ionicPopup.confirm({
             title: 'Confirm?',
             template: 'Are you sure you want to add this pack quantity to stock?'
           });

           confirmPopup.then(function(res) {
             if(res) {

                $ionicLoading.show({
                  content: 'Loading',
                  animation: 'fade-in',
                  showBackdrop: true,
                  maxWidth: 200,
                  showDelay: 0
                });

               var url = "https://script.google.com/macros/s/AKfycbwDDFvPu1OzYzybL8_6xUkRnR52D5re86bHdXYnnx8esC_RtRFw/exec?qrcode="+$scope.APIresponse.qr_code+"&operation=add&quantity=" +quantity;

                $http.get(url)
                .then(function(response) {
                    $ionicLoading.hide();

                    var alertPopup = $ionicPopup.alert({
                       title: 'Success!',
                       template: 'Quantity added to pack stock!'
                     });

                     alertPopup.then(function(res) {
                       // reloadData($scope.APIresponse.qr_code);
                       $scope.APIresponse.quantity_balance = parseInt($scope.APIresponse.quantity_balance) + parseInt(quantity);
                        $scope.quantity = undefined;
                     });


                     
                });
             } else {
               console.log('You are not sure');
             }
           });
       }else{
          var alertPopup = $ionicPopup.alert({
             title: 'Error!',
             template: 'Insert the quantity before adding!'
           });

           alertPopup.then(function(res) {
             console.log('Done!');
           });
       }


        
    }


    $scope.removePacksfromStock = function(quantity){
       if(parseInt($scope.APIresponse.quantity_balance)!=0){
          if(quantity!="" && quantity!=null && quantity!=undefined){
            var confirmPopup = $ionicPopup.confirm({
               title: 'Confirm?',
               template: 'Are you sure you want to remove this pack quantity from stock?'
             });

             confirmPopup.then(function(res) {
               if(res) {

                  $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                  });

                 var url = "https://script.google.com/macros/s/AKfycbwDDFvPu1OzYzybL8_6xUkRnR52D5re86bHdXYnnx8esC_RtRFw/exec?qrcode="+$scope.APIresponse.qr_code+"&operation=sub&quantity=" +quantity;

                  $http.get(url)
                  .then(function(response) {
                      $ionicLoading.hide();

                      var alertPopup = $ionicPopup.alert({
                         title: 'Success!',
                         template: 'Quantity removed from pack stock!'
                       });

                       alertPopup.then(function(res) {
                         // reloadData($scope.APIresponse.qr_code);
                         $scope.APIresponse.quantity_balance = parseInt($scope.APIresponse.quantity_balance) - parseInt(quantity);
                          $scope.quantity = undefined;
                       });

                       

                       
                  });
               } else {
                 console.log('You are not sure');
               }
             });
         }else{
            var alertPopup = $ionicPopup.alert({
               title: 'Error!',
               template: 'Insert the quantity before removing!'
             });

             alertPopup.then(function(res) {
               console.log('Done!');
             });
         }
       }else{
           var alertPopup = $ionicPopup.alert({
                         title: 'Error!',
                         template: 'There is no packs in stock to remove!'
                       });

                       alertPopup.then(function(res) {

                       });
       }


        
    }

    // function reloadData(qrcode){
    //   $ionicLoading.show({
    //     content: 'Loading',
    //     animation: 'fade-in',
    //     showBackdrop: true,
    //     maxWidth: 200,
    //     showDelay: 0
    //   });

    //   $http.get("https://script.google.com/macros/s/AKfycbwDDFvPu1OzYzybL8_6xUkRnR52D5re86bHdXYnnx8esC_RtRFw/exec?qrcode="+qrcode, {})
    //   .success(function (response) {

    //               if (response.hasError) {
    //                 console.log("Error")
    //               } else {
    //                 console.log("Success");
    //                 console.log($scope.APIresponse);
    //                  $ionicLoading.hide();
                   
    //                 $scope.APIresponse = response.infos;
                     
    //               }

    //           })
    //   .error(function (response) {
    //             console.log("Response error")
    //             console.log(response)
                 
    //           });
    //  }
    

})


.controller('stockCheckCtrl', function($scope, $http,$state, $cordovaBarcodeScanner, $ionicLoading, apiService, $ionicPopup, $timeout) {
$scope.showFlag = false;
$scope.show = false;
 
  // $scope.barcodeVal = "N1488916";

  // verifyQRCode($scope.barcodeVal);

 
  document.addEventListener("deviceready", function () {
    openBarcodeScanner();
  }, false);

 
  $scope.scanBarcode = function(){
    openBarcodeScanner();
  }

  function openBarcodeScanner(){
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // alert(barcodeData.text);
        $scope.barcodeVal = barcodeData.text;

        if($scope.barcodeVal!="" && $scope.barcodeVal!=null && $scope.barcodeVal!=undefined){
          verifyQRCode($scope.barcodeVal);
        }else{
          $scope.showFlag = true;
        }
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

    // alert("verifyQRCode");

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $http.get("https://script.google.com/macros/s/AKfycbwDDFvPu1OzYzybL8_6xUkRnR52D5re86bHdXYnnx8esC_RtRFw/exec?qrcode="+qrcode, {})
    .success(function (response) {

                if (response.hasError) {
                  console.log("Error")
                } else {
                  console.log("Success")

                   $ionicLoading.hide();
                 
                   console.log(response.infos);
                   $scope.APIresponse = response.infos;
                   console.log(response);
                  
                    if($scope.APIresponse.length!=0){
                      

                      var data = $scope.APIresponse[0];

                      var obj = {
                          "activity_id" : data.activity_id,
                          "reorder" : parseInt(data.reorder),
                          "quantity_balance" : parseInt(data.quantity_balance),
                          "qr_code" : data.qr_code
                      };

                      apiService.setPackInfo(obj);
                      $scope.showFlag = true;
                      $state.go('tabs.mainmenu');

                    }else if($scope.APIresponse.length==0){

                      var alertPopup = $ionicPopup.alert({
                         title: 'Error!',
                         template: 'Invalid QR Code'
                       });

                       alertPopup.then(function(res) {
                         console.log('Done');
                       });
                    }
                }

            })
    .error(function (response) {
              console.log("Response error")
              console.log(response)
               
            });
   };

});
