angular.module('starter.services', [])

.service('YelpAuthService', function($http, AUTH_EVENTS, AUTH_URLS, $ionicPopup, $q, $rootScope, $httpParamSerializerJQLike, CLIENT_SECRET){
  var isAuthenticated=false;

  function storeToken(token) {
    console.log("SUCCESS TOKEN: " + token);
    if(window.localStorage.getItem("LOCAL_TOKEN_KEY") !== null){
        window.localStorage.removeItem("LOCAL_TOKEN_KEY");
    }
    window.localStorage.setItem("LOCAL_TOKEN_KEY", token);
  }

  function destroyUserCredentials(){
      isAuthenticated=false;
      if(window.localStorage.getItem("LOCAL_TOKEN_KEY") !== null){
          window.localStorage.removeItem("LOCAL_TOKEN_KEY");
      }
  }

  var successlogin = function(token){
      isAuthenticated=true;
      storeToken(token);
  };

  var signin = function () {

    data = {
      client_id: CLIENT_SECRET.client_id,
      client_secret: CLIENT_SECRET.client_secret
    };

    $http({
      method: 'POST',
      url: AUTH_URLS.base_signin,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $httpParamSerializerJQLike(data)
    }).success(function successCallback(success){
      console.log("Login success!")
      var intoken = success.access_token;
      successlogin(intoken);
    }).error(function errorCallback(error) {
      console.log(error);
      $rootScope.error = 'Invalid credentials.';
      var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
      });
    });
  };

  var logout = function(){
      destroyUserCredentials();
  };

  return {
      successlogin: successlogin,
      logout: logout,
      signin: signin,
      isAuthenticated: function(){return isAuthenticated;}
  };

})

.service("YelpService", function ($q, $http, AUTH_URLS, $cordovaGeolocation, $ionicPopup, $ionicPlatform) {
  var self = {
    'term': 'Cafe',
    'page': 0,
    'isLoading': false,
    'hasMore': true,
    'results': [],
    'lat': 37.773972,
    'lon': -122.431297,
    'radius': 2500
  };

  var newFilters = function (nterm, nradius){
    self.term = nterm;
    self.radius = nradius;

    console.log('NEW TERM!!!!!');
    console.log(self.term);
  };

  var refresh = function () {
      self.page = 0;
      self.isLoading = false;
      self.hasMore = true;
      self.results = [];
      return load();
    };

  var next = function () {
      self.page += 1;
      return load();
    };

  var load = function () {
      self.isLoading = true;
      var deferred = $q.defer();

      $ionicPlatform.ready(function() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {

            self.lat = position.coords.latitude;
            self.lon = position.coords.longitude;

            var params = {
              offset: 20*self.page,
              latitude: self.lat,
              longitude: self.lon,
              term: self.term,
              radius: self.radius
            };

            $http.get(AUTH_URLS.base_search, {params: params})
              .success(function (data) {
                self.isLoading = false;
                //console.log(data);

                if (data.businesses.length == 0) {
                 self.hasMore = false;
                } else {
                 angular.forEach(data.businesses, function (business) {
                   self.results.push(business);
                 });
                }

                deferred.resolve();
              })
              .error(function (data, status, headers, config) {
                self.isLoading = false;
                deferred.reject(data);
              });

          }, function(err) {
            console.log(err);
            var alertPopup = $ionicPopup.alert({
              title: 'Unkown Position!',
              template: 'Could not get your current position!'
            });
          });
      });

      return deferred.promise;
    };

    var getData = function(){
      return self;
    };

  return{
    getData: getData,
    load: load,
    next: next,
    refresh: refresh,
    newFilters: newFilters
  };
})


// intercept every HTTP request and inject it with an Authorization header containing our JWT if the user is authenticated

.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS){
    return {
        request: function (config) {
            config.headers = config.headers || {};
            var local_token = window.localStorage.getItem("LOCAL_TOKEN_KEY");
            if ( local_token !== null) {
                config.headers.Authorization = 'Bearer ' + local_token;
            }
            return config;
        },
        responseError: function(response){
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthenticated
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
})
