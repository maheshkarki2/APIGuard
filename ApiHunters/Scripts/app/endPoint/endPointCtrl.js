(function () {
	'use strict';

	angular
        .module('app')
        .controller('endPointCtrl', endPointCtrl);

	endPointCtrl.$inject = ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'salesService'];

	function endPointCtrl($scope
        , $rootScope
        , $http
        , $state
        , $staetParams
        ,salesService) {
	    $scope.title = 'apiEndpoint';

	    activate();
	    $scope.customeHeaders = { authTokenHeader: null, authTokenValue: null };
	    $scope.inputData = [];
	    $scope.value = 1;
	    $scope.rvalue = 2;
	    $scope.headerActive = "active";
	    $scope.requestActive = "active";
	    $scope.responseActive = "inactive";
	    $scope.HitApi=function()
	    {
	        $scope.customHeaders = $scope.ComposeHeader();
	        //var result = salesService.getHttpRequest($scope.url, null, $scope.customeHeaders);
	        var getRequest = salesService.getRequest($scope.url, null, $scope.customHeaders).get().$promise;
	        getRequest.then(function (success) {
	            $scope.JsonResponse = JSON.stringify(success, null, 2);
	            SelectTab(3);
	        },
                function (error) {
                    $scope.JsonResponse = JSON.stringify(error, null, 2);
                    $scope.SelectTab(3);
                });
	    }

	    function activate() { }

	    //$scope.choices = [{ id: 'choice1'}];
        $scope.choices=[];
	    $scope.addNewChoice = function () {
	        var newItemNo = $scope.choices.length + 1;
	        $scope.choices.push({ 'id': 'choice' + newItemNo});
	    };

	    $scope.removeChoice = function () {
	        var lastItem = $scope.choices.length - 1;
	        $scope.choices.splice(lastItem);
	    };

	    $scope.SelectTab = function (data) {
	        $scope.rvalue = data;
	        if (data == 2) {
	            $scope.requestActive = "active";
	            $scope.responseActive = "inactive";
	        }
	        if (data == 3) {
	            $scope.responseActive = "active";
	            $scope.requestActive = "inactive";
	        }
	    };

	    $scope.ComposeHeader = function () {
	        $scope.choices.forEach(function (data) {
	            $scope.customeHeaders.authTokenHeader = 'Authorization';
	            $scope.customeHeaders.authTokenValue = 'bearer '+data.headerValue;
	        });
	        return $scope.customeHeaders;
            
	    };
	}
})();
