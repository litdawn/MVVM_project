import {isObject} from "./util.js";

/**
 * @file 数据劫持
 */
class Observer{
	constructor(data) {
		this.observe(data);
	}

	observe(data){
		if(isObject(data)){
			Object.keys(data).forEach(key=>{
				this.defineReactive(data,key,data[key]);
				this.observe(data[key]);
			})
		}
	}

	/**
	 * 定义响应式
	 * @param data {Object}对象
	 * @param key {string}属性
	 * @param value {string||number||Object}属性的值
	 */
	defineReactive(data,key,value){
		let that = this;
		let dep = new Dep();
		Object.defineProperty(data,key,{
			get(){
				Dep.target&&dep.addSubscriber(Dep.target);
				// console.log("target",Dep.target)
				return value;
			},
			set(update){
				// console.log("set")
				if(update!==value) {
					if(isObject(update))
						that.observe(update);
					value = update;
					dep.recognize();
				}
			}
		})
	}
}
export default Observer;
window.Observer = Observer;