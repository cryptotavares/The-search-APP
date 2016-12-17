angular.module('starter.controllers', [])


// APP controller - logins to YELP API //

.controller("AppController", function ($ionicPlatform, YelpAuthService, $ionicPopup) {
  $ionicPlatform.ready(function() {
    console.log('Start');
    YelpAuthService.signin();
  });
})


// MAPS controller //

.controller("MapController", function ($scope, $ionicPlatform, YelpService, $ionicPopup, NgMap) {

  $scope.test = {
    results:[{
      name: 'Teste Restaurant',
      distance: 2835,
      location: {
        address1: 'Praça Afranio Peixoto'
      },
      rating: 4.5,
      review_count: 1600,
      image_url: '../img/cafe-maps-icon2_size.png',
      coordinates: {
        latitude: 38.725478,
        longitude: -9.150324
      }
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png',
      coordinates: {
        latitude: 38.712170,
        longitude: -9.139509
      }
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png',
      coordinates: {
        latitude: 38.713558,
        longitude: -9.128523
      }
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png',
      coordinates: {
        latitude: 38.736258,
        longitude: -9.133759
      }
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png',
      coordinates: {
        latitude: 38.736659,
        longitude: -9.147234
      }
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png',
      coordinates: {
        latitude: 38.745095,
        longitude: -9.140625
      }
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png',
      coordinates: {
        latitude: 38.748576,
        longitude: -9.151440
      }
    }]
  };

  NgMap.getMap().then(function(map) {
    // console.log('map', map);
    $scope.map = map;
    console.log('SCOPE MAP showInfoWindow: ');
    console.log($scope.map.showInfoWindow);
  });

  $scope.ymap = YelpService.getData();

  $scope.showDetails = function (event, place){
    $scope.yplace = place;
    // console.log($scope.yplace);
    // console.log('THIS THIS');
    // console.log(this);
    // console.log('MAP MAP');
    // console.log($scope.map);
    $scope.map.showInfoWindow('marker-info', this);
  };

  $scope.mapDirections = function (placeM){
    var destination = [
      placeM.coordinates.latitude,
      placeM.coordinates.longitude
    ];

    var source = [
      $scope.ymap.lat,
      $scope.ymap.lon
    ];

    var options = {
      app: launchnavigator.APP.USER_SELECT
    };

    launchnavigator.navigate(destination, source, options);
  };

})


// List controller //

.controller("YelpController", function ($scope, YelpAuthService, YelpService, AUTH_EVENTS, $ionicPlatform, $ionicPopup, $ionicModal) {

  $scope.test = {
    results:[{
      name: 'Teste Restaurant',
      distance: 2835,
      location: {
        address1: 'Praça Afranio Peixoto'
      },
      rating: 4.5,
      review_count: 1600,
      image_url: '../img/cafe-maps-icon2_size.png'
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png'
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png'
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png'
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png'
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png'
    },
    {
      name: 'Teste Pratica',
      distance: 535,
      location: {
        address1: 'Av. Republica Testes'
      },
      rating: 4.2,
      review_count: 320,
      image_url: '../img/cafe-maps-icon2_size.png'
    }]
  };

  YelpService.load();

  $scope.yelp = YelpService.getData();

  $ionicModal.fromTemplateUrl('templates/modal-filters.html', {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.setNewFilters();
  };

  $scope.setNewFilters = function(){
    console.log($scope.yelp.term);
    YelpService.newFilters($scope.yelp.term, $scope.yelp.radius);
    $scope.doRefresh();
  }

  $scope.doRefresh = function (){
    if(!$scope.yelp.isLoading){
      YelpService.refresh().then( function (){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
  };

  $scope.loadMore = function (){
    if(!$scope.yelp.isLoading && $scope.yelp.hasMore){
      YelpService.next().then( function (){
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })
    }
  };

  $scope.directions = function (cafe){
    var destination = [
      cafe.coordinates.latitude,
      cafe.coordinates.longitude
    ];

    var source = [
      $scope.yelp.lat,
      $scope.yelp.lon
    ];

    var options = {
      app: launchnavigator.APP.USER_SELECT
    };

    launchnavigator.navigate(destination, source, options);
  };

});
