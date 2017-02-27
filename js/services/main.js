/**
 * Created by Administrator on 2017/2/27.
 */


(function (angular){
	'use strict';

	angular.module('app-services-main',[])
		.service('MainService',['$window',function($window){

			/*var todos = [
				{id:1,text:'事件1',completed:false},
				{id:2,text:'事件2',completed:true},
				{id:3,text:'事件3',completed:false}
			];*/
			/**
			 * angular在使用JSON.stringify(obj),会自动在对象中添加$$hashKey:XX的键值对
			 * 该键值对的值会重复，造成ng-repeat的重复键的bug
			 * 如果ng-repeat结合了filter过滤器，那么使用track by 关键词又会造成filter:notArray错误
			 * 这里是有angular.Json() 替换JSON.stringify()方法，不会生成改键值对
			 * @type {Storage}
             */
			var storage = $window.localStorage;
			var todos = storage['list'] ? JSON.parse(storage['list']) : [];

			this.save = function(){
				storage['list'] = angular.toJson(todos);
			};



			//暴露数据
			this.get = function(){
				return todos;
			};

			//私有函数，获取唯一id
			function getId(){
				var id = Math.floor(Math.random()*100);
				for(var i = 0 ; i < todos.length ; i++){
					if(todos[i].id === id){
						id = getId();
						break;
					}
				}
				return id;
			}
			//增删改查事件
			//增加
			this.add  = function (text) {
				todos.push({
					id:getId(),
					text: text,
					completed : false
				});
				this.save();
			};
			//删除
			this.remove = function (id) {
				for(var i = 0 ; i < todos.length ; i++){
					if(id === todos[i].id){
						todos.splice(i,1)
					}
				}
				this.save();
			};

			//清除
			this.clear = function () {
				var arr = [];
				for (var i = 0; i < todos.length; i++) {
					if(!todos[i].completed){
						//未完成的项保存到临时列表中
						arr.push(todos[i]);
					}
				}

				todos = arr;
				this.save();
				return todos;
			};

			//判断是否有完成的

			this.existCompleted = function(){
				for (var i = 0; i < todos.length; i++) {
					if(todos[i].completed){
						return true;
					}
				}
				return false ;
			};

			//全选的切换
			var now = true;
			this.toggleAll = function(){
				for (var i = 0; i < todos.length; i++) {
					todos[i].completed = now;
				}
				now = !now;
				this.save();
			};


		}])
})(angular);
