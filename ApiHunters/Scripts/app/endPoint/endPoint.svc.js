(function () {
    'use strict';

    // register service as a factory
    angular.module('app').factory('salesService', salesService);

    salesService.$inject = ['$resource'];
    var headers = {};
    function salesService($resource, url) {

        return $resource(url,
        { id: '@id' },
        {
            'query': { isArray: false },
            'getRequest': { 'method': 'GET', 'url': url, 'headers': {'authorization': headers.authToken}},       
            'postRequest': { 'method': 'POST', 'url': url, 'headers': { 'authorization': headers.authToken }}
        });
    }
})();