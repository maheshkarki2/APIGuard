(function () {
    'use strict';

    // register service as a factory
    angular.module('app').factory('salesService', salesServiceDef);

    salesServiceDef.$inject = ['$resource', '$http'];
   
    function salesServiceDef($resource,$http) {
        var salesService = {};
        salesService.getRequest = getRequestService3;
        salesService.postRequest = PostRequestService;
        salesService.getHttpRequest = getRequesthttp;
        function getRequestService(passurl,requestBody, customheaders)
        {
            $http.defaults.headers.common.Authorization = customheaders.authTokenValue;
            return $resource(passurl,
                null,
                {
                    GET : {
                        method: 'GET',
                        url:passurl
                    }
                });
        }

        function getRequesthttp(passurl,requestBody, customheaders)
        {
            $http({
                method: 'GET',
                url: passurl,
                headers:{'Authorization':customheaders.authTokenValue}
                }).then(function Success(success) {
                return success;
            }, function Error(error) {
                return error;
            });
        }
       function getRequestService2(passurl, requestBody, customeheaders)
        {
            return $resource(passurl, null, {}, { headers: { 'Authorization': customeheaders.authTokenValue } }).get(null, null);                     
       }

       function getRequestService3(passurl, requestBody, customheaders)
       {
           return $resource(passurl, null, { 'get': { headers: { 'Authorization': customheaders.authTokenValue } } });
       }
        
        function PostRequestService(url, requestBody, headers) {
            return $resource(url,
                { /*define params here ex- Id: '@Id' */ },
                {
                    post: {
                        method: 'POST',
                        headers: { 'Authorization': customheaders.authTokenValue }
                    }
                });
        }

        function getRequest5(passurl,requestBody, customheaders)
        {
            return $resource(passurl,
                {id:'@id'},
                {
                    'query': { isArray: false },
                    'getRequestFor': { 'method': 'GET', 'url': passurl, 'headers': {'Authorization':customheaders.authTokenValue}}
                }
                );
        }

        return salesService;
        //return $resource(url,
        //{ id: '@id' },
        // {

        //    'query': { isArray: false },
        //    'getRequest': { 'method': 'GET', 'url': url, 'headers': {'authorization': headers.authToken}},       
        //    'postRequest': { 'method': 'POST', 'url': url, 'headers': { 'authorization': headers.authToken }}
        //});
    }
})();