import {findValue} from "./util.js";
import Dep from "./Dep.js";

/**
 * @file 观察者模式
 */
class Watcher {
	vm;
	expression;
	cbFunc;
	value;
	constructor(vm,expression,cbFunc) {
		this.vm = vm;
		this.expression = expression;
		this.cbFunc = cbFunc;

		this.value = this.get();
	}

	/**
	 * 比较新旧值
	 */
	compare(){
		// console.log("调用过")
		let newValue = findValue(this.vm,this.expression);
		let oldValue = this.value;
		if(newValue!==oldValue){
			// console.log("知道不一样了")
			this.cbFunc(newValue);
		}
	}

	/**
	 * @return {any} 真正的值
	 */
	get(){
		Dep.target = this;
		let value = findValue(this.vm,this.expression);
		Dep.target=null;
		return value;
	}

}
export default Watcher;