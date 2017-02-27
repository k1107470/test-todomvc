/**
 * Created by Administrator on 2017/2/27.
 */



(function (angular) {
	'use strict';

	var controllers = angular.module('app.controllers.main', ['app-services-main']);


	controllers.controller('MainController', [
		'$scope',
		'MainService',
		'$routeParams',
		'$route',
		function ($scope, MainService, $routeParams, $route) {

			//绑定文本输入
			$scope.text = '';

			//绑定todos列表
			$scope.todos = MainService.get();

			$scope.add = function () {
				if (!$scope.text) {
					return;
				}
				MainService.add($scope.text);
				$scope.text = '';
			};
			//删除项的功能
			$scope.remove = MainService.remove;

			// 清除所有的完成项
			$scope.clear = function () {
				var arr = MainService.clear();
				$scope.todos = arr;
			};
			//判断是否有完成的项

			$scope.existCompleted = MainService.existCompleted;

			//全选的切换
			$scope.toggleAll = MainService.toggleAll;

			//文本编辑功能
			//定义一个不存的id，需要编辑的项获取该id，失去焦点或者提交后还原id并还原这个不存在的id
			$scope.editingId = -1;
			$scope.editing = function (item) {
				if (!item.completed) {
					$scope.editingId = item.id;
				}
			};
			$scope.save = function () {
				$scope.editingId = -1;
			};

			// 自定义比较函数, 默认filter过滤器使用的是模糊匹配
			$scope.equalCompare = function (source, target) {
				return source === target;
			};
			// 状态筛选
			$scope.selector = {}; // {} {completed:true} {completed:false}
			// 取路由中匹配出来的数据
			$scope.status = $routeParams.status;
			switch ($scope.status) {
				case 'active':
					$scope.selector = {completed: false};
					break;
				case 'completed':
					$scope.selector = {completed: true};
					break;
				default:
					$route.updateParams({status: ''});
					$scope.selector = {};
					break;
			}
			//单项的切换的缓存方法
			$scope.toggle = function(){
				MainService.save();
			}

		}]);
})(angular);
