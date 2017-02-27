(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var myApp = angular.module('app', ['ngRoute', 'app.controllers.main']);


	//设置路由+path值bug解决
	myApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
		$routeProvider
		// /asdasda {status:asdasda}
			.when('/:status', {
				controller: 'MainController',
				templateUrl: 'main_tmpl'
			})
			.otherwise({ redirectTo: '/' });
		//处理自动前缀!#而造成路由器使用困难的bug==》改为了空字符串
		$locationProvider.hashPrefix("");
	}]);
})(angular);
