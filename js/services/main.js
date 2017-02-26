/**
 * Created by Administrator on 2017/2/25.
 */
(function (angular) {
	'use strict';

	angular.module('app.services.main', [])
		.service('MainService', [ '$window', function ( $window) {
			//业务逻辑

			/**
			 *定义一个本地存储，由于通过键值获取的值是字符串形式，所以需要转换为对象,并赋给todos
			 * 这里我们定义存储todos的键位'list'，storage['list']为存储todos的位置
			 * @type {Storage}
			 */

			var storage = $window.localStorage;
			var todos = storage['my_todo_list'] ? JSON.parse(storage['my_todo_list']) : [];	//缓存设置

			//console.log(storage);




			//返回todos列表
			this.get = function () {
				return todos;
			};

			//定义一个缓存的方法
			/**
			 * 当todos发生改变，将其对象转换为字符串存储到定义的本地缓存位置
			 * 该方法在todos发生增删改查是都需要初始化
			 */
			this.save = function() {
				storage['my_todo_list'] = JSON.stringify(todos);
			};
			//获得唯一id的方法
			function getId() {
				var id =Math.floor(Math.random()*100) ;
				for (var i = 0; i < todos.length; i++) {
					if (id === todos[i].id) {
						id = getId();
						break;
					}
				}
				return id;

			}

			//增加todos
			this.add = function (text) {
				todos.push({
					id: getId(),
					text: text,
					completed: false
				});
				this.save();
			};

			//删除当前项
			this.remove = function (id) {
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].id === id) {
						todos.splice(i, 1);
						break;
					}
				}
				this.save();
			};

			//清除clear
			this.clearCompleted = function () {
				var arr = [];
				for (var i = 0; i < todos.length; i++) {
					if (!todos[i].completed) {
						arr.push(todos[i]);
					}
				}
				todos = arr;
				this.save();
				//这里涉及到todos对象地址的变更，因此需返回到控制器重新改变控制器中todos对象的地址
				return todos;
			};

			//判断是否有已经完成的
			this.exsitCompleted = function () {
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].completed) {
						return true;
					}
				}
				//都未完成，则返回false
				return false;
			};

			//全选的切换
			var now = true;
			this.toggleAll = function () {
				for (var i = 0; i < todos.length; i++) {
					todos[i].completed = now;
				}
				this.save();
				now = !now;
			};


		}])
})(angular);
