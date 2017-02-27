/**
 * Created by Administrator on 2017/2/27.
 */


(function (angular){
	'use strict';

	angular.module('app-services-main',[])
		.service('MainService',[function(){

			var todos = [
				{id:1,text:'事件1',completed:false},
				{id:2,text:'事件2',completed:true},
				{id:3,text:'事件3',completed:false}
			];

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
				})
			};
			//删除
			this.remove = function (id) {
				for(var i = 0 ; i < todos.length ; i++){
					if(id === todos[i].id){
						todos.splice(i,1)
					}
				}
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
			};


		}])
})(angular);
