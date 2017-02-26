/**
 * Created by Administrator on 2017/2/25.
 */
(function (angular) {
	'use strict';
	var controllers = angular.module('app.controllers.main', ['app.services.main']);
	/*
	*缓存bug的解决方法，原理未知--与filer参数 数组还是对象 缓存数组会添加$$hashKey造成ngRepeat重复的key 有关
	* @filter : custom
	*/

	controllers.filter('custom', function() {
		return function(input, search) {
			if (!input) return input;
			if (!search) return input;
			var expected = ('' + search).toLowerCase();
			var result = {};
			angular.forEach(input, function(value, key) {
				var actual = ('' + value).toLowerCase();
				if (actual.indexOf(expected) !== -1) {
					result[key] = value;
				}
			});
			return result;
		}
	});
	controllers.controller('MainController', [
		'$scope',
		'MainService',
		'$location',
		function ($scope, MainService,$location) {
			$scope.input = '';
			$scope.todos = MainService.get();


			//添加
			$scope.add = function(){
				if(!$scope.input){
					//如果输入的是空字符串
					return;
				}
				MainService.add($scope.input);
				$scope.input = '';
			};

			//删除
			$scope.remove = function(id){
				MainService.remove(id);
			};

			//清除所有完成项
			$scope.clear = function(){
				var arr = MainService.clearCompleted();
				//这里建立了一个空对象接受返回值
				//再赋值给$scope.todos，避免了$scope.todos的地址指向改变为service清空方法中arr对象
				//否则不能和service中的todo同步，用这里新建的对象接受后赋值可以动态改变指向
				$scope.todos = arr;
			};

			//判断是否有完成的
			$scope.exsitCompleted = MainService.exsitCompleted;

			/**
			 * 文本编辑的思考
			 * 1.定义一个不存在的id
			 * 2.label被双击时候将改项的id值赋予给currentId
			 * 3.li的ng-class判断id是否等于currentId，结果赋给editing这个设置好的css样式属性
			 * 4.编辑的input值绑项的文本信息，item.text
			 * 5.input可以用form包裹，便于回车提交，提交（ng-submit）时初始化currentId的值,失去焦点（ng-blur）也触发初始化currentId值
			 * 6.以上过程保证了同一时刻只有一个项能够被编辑
			 */
			$scope.currentId = -1;
			$scope.editing = function(item){
				if(!item.completed){
					//未完成的项才能编辑
					 $scope.currentId = item.id;
				}
			};
			$scope.save = function(){
				$scope.currentId = -1;
			};


			//筛选的参数函数
			/*$scope.absEqual = function(source,target){
				return source === target;
			};*/
			//全选的切换
			$scope.toggleAll = MainService.toggleAll;


			// 监视$location获取#后的值
			//由于$scope.$watch只能监视$scope 的对象，所有需要转换$location
			$scope.selector = {};
			$scope.location = $location;
			console.log($location.hash());
			$scope.$watch('location.hash()',function(now,old){
				switch (now){
					case '/active':
						$scope.selector = {completed:false};
						break;
					case '/completed':
						$scope.selector = {completed:true};
						break;
					default:
						$scope.selector = {};
						break;
				}

			});

			//缓存单个项的input的completed标识
			$scope.toggle = function(){
				MainService.save();
			}
		}])
})(angular);
