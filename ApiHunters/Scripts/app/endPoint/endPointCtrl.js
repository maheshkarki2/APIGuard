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
	    $scope.headerActive = "active";
	    $scope.requestActive = "inactive";
	    $scope.responseActive = "inactive";
	    $scope.HitApi=function()
	    {
	        $scope.customHeaders=$scope.ComposeHeader();
	        var getRequest = salesService.getRequest($scope.url, null, $scope.customHeaders).$promise;
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

	    $scope.choices = [{ id: 'choice1'}];

	    $scope.addNewChoice = function () {
	        var newItemNo = $scope.choices.length + 1;
	        $scope.choices.push({ 'id': 'choice' + newItemNo});
	    };

	    $scope.removeChoice = function () {
	        var lastItem = $scope.choices.length - 1;
	        $scope.choices.splice(lastItem);
	    };

	    $scope.SelectTab = function (data) {
	        $scope.value = data;
	        if (data == 1) {
	            $scope.headerActive = "active";
	            $scope.requestActive = "inactive";
	            $scope.responseActive = "inactive";
	        }
	        if (data == 2) {
	            $scope.requestActive = "active";
	            $scope.headerActive = "inactive";
	            $scope.responseActive = "inactive";
	        }
	        if (data == 3) {
	            $scope.responseActive = "active";
	            $scope.headerActive = "inactive";
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
