(function () {
    'use strict';

    // register service as a factory
    angular.module('app').factory('salesService', salesServiceDef);

    salesServiceDef.$inject = ['$resource'];
   
    function salesServiceDef($resource) {
        var salesService = {};
        salesService.getRequest = getRequestService2;
        salesService.postRequest = PostRequestService;
        function getRequestService(passurl,requestBody, customheaders)
        {
            return $resource(passurl,
                null,
                {
                    GET : {
                        method: 'GET',
                        url:passurl,
                        headers: { 'authorization': customheaders.authTokenValue }
                    }
                });
        }
       function getRequestService2(passurl, requestBody, customeheaders)
        {
            return $resource(passurl, null, {}, { headers: { 'Authorization': customeheaders.authTokenValue } }).get(null, null);                     
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