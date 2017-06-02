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
        , salesService) {
	    var vm = this;
	    vm.title = 'apiEndpoint';

	    activate();
	    vm.customeHeaders = { authTokenHeader: null, authTokenValue: null };
	    vm.inputData = [];
	    vm.value = 1;
	    vm.rvalue = 2;
	    vm.headerActive = "active";
	    vm.requestActive = "active";
	    vm.responseActive = "inactive";

	    vm.requestList = [{ requestKind: 'GET' }, { requestKind: 'POST' }, { requestKind: 'PUT' }, { requestKind: 'DELETE' }];
	    vm.selectedRequest = vm.requestList[0];
	    vm.HitApi=function()
	    {
	        if (vm.selectedRequest.requestKind == "GET")
                {
	        vm.customHeaders = vm.ComposeHeader();
	        //var result = salesService.getHttpRequest(vm.url, null, vm.customeHeaders);
	        var getRequest = salesService.getRequest(vm.url, null, vm.customHeaders).get().$promise;
	        getRequest.then(function (success) {
	            vm.JsonResponse = JSON.stringify(success, null, 2);
	            SelectTab(3);
	        },
                function (error) {
                    vm.JsonResponse = JSON.stringify(error, null, 2);
                    vm.SelectTab(3);
                });
	        }
	        if (vm.selectedRequest.requestKind == "POST")
	        {
	            var postRequest = salesService.postRequest(vm.url, null, null).save(vm.jsonRequest).$promise;
	            postRequest.then(function (success) {
	                vm.JsonResponse = JSON.stringify(success, null, 2);
	                SelectTab(3);
	            },
                function (error) {
                    vm.JsonResponse = JSON.stringify(error, null, 2);
                    vm.SelectTab(3);
                });
	        }
	    }

	    function activate() { }

	    //vm.choices = [{ id: 'choice1'}];
        vm.choices=[];
	    vm.addNewChoice = function () {
	        var newItemNo = vm.choices.length + 1;
	        vm.choices.push({ 'id': 'choice' + newItemNo});
	    };

	    vm.removeChoice = function () {
	        var lastItem = vm.choices.length - 1;
	        vm.choices.splice(lastItem);
	    };

	    vm.SelectTab = function (data) {
	        vm.rvalue = data;
	        if (data === 2) {
	            vm.requestActive = "active";
	            vm.responseActive = "inactive";
	        }
	        if (data === 3) {
	            vm.responseActive = "active";
	            vm.requestActive = "inactive";
	        }
	    };

	    vm.ComposeHeader = function () {
	        vm.choices.forEach(function (data) {
	            vm.customeHeaders.authTokenHeader = 'Authorization';
	            vm.customeHeaders.authTokenValue = 'bearer '+data.headerValue;
	        });
	        return vm.customeHeaders;
            
	    };
	}
})();
