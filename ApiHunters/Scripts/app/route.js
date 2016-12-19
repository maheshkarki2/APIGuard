(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state(
                {
                    name:'EndPoint',
                    url: '/EndPoint',
                    views: {
                        '': {
                            templateUrl: 'Scripts/app/endPoint/endPoint.html',
                            controller: 'endPointCtrl'
                        },
                        'EndPont.Header@View': {
                            templateUrl: 'Scripts/app/endPoint/Header.html',
                            controller:'endPointCtrl'
                        }
                    }

                }).
            state('EndPoint.Header',{
                url: '/Header',
                templateUrl: 'Scripts/app/endPoint/Header.html',
                controller: 'endPointCtrl'
        });

            $urlRouterProvider.otherwise('/login');
        }]);


})();