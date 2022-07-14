import {isDirective,isElementNode,isObject,isTextNode,findValue,getTextValue,setValue} from "../src/util.js";
import {CompilerUtil} from "../src/CompilerUtil.js";
import Dmvvm from "../src/Dmvvm.js";
import Watcher from "../src/Watcher.js";

describe('测试', () => {
	it('测试能否正常分辨d-命令', () => {
		// let util = require("./src/util.js")
		expect(isDirective("d-jjj")).toEqual(
			true
		)
	})
	it('测试能否正常分辨d-命令', function () {
		expect(isDirective("jd-jj")).toEqual(
			false
		)
	});
	it('测试能否正常分辨ElementNode', function () {
		let elementNode = ""
		expect(isElementNode(elementNode)).toEqual(
			false
		)
	});
	it('测试能否正常分辨ElementNode', function () {
		let elementNode = document.createElement('input')
		expect(isElementNode(elementNode)).toEqual(
			true
		)
	});
	it('测试能否正常分辨ElementNode', function () {
		let elementNode = ""
		expect(isElementNode(elementNode)).toEqual(
			false
		)
	});
	it('测试能否正常分辨TextNode', function () {
		let TextNode = ""
		expect(isTextNode(TextNode)).toEqual(
			false
		)
	});
	it('测试能否正常分辨Object', function () {
		let object = {'key':'value'};
		expect(isObject(object)).toEqual(
			true
		)
	});
	it('测试findValue', function () {
		let object = {
			data: {
				test:{
					a:'a-test',
					b:'b-test'
				}
			}
		};
		expect(findValue(object,"test.a")).toEqual(
			'a-test'
		)
	});
	it('测试getTextValue', function () {
		let object = {
			data:{
				test:{
					a:'a-test',
					b:'b-test'
				}
			}
		};
		expect(getTextValue("{{test.a}} is test.a's value",object)).toEqual(
			"a-test is test.a's value"
		)
	});
	it('测试setValue', function () {
		let object = {
			data:{
				test:{
					a:'a-test',
					b:'b-test'
				}
			}
		};
		setValue(object,"test.a","after test")
		expect(object).toEqual(
			{
				data:{
					test:{
						a:'after test',
						b:'b-test'
					}
				}
			}
		)
	});
	///////
	let vm={
		data:{
			test:{
				a:"aaaa",
				b:"bbbb"
			}
		}
	}
	it('测试能否正常解析text', () => {
		let textNode = {
			textContent:"{{test.a}} is value of test.a"
		}
		CompilerUtil.text(textNode,vm,textNode.textContent);
		expect(textNode).toEqual(
			{
				textContent:"aaaa is value of test.a"
			}
		)
	})
	it('测试能否正常解析element', () => {
		let elementNode = document.createElement("input");
		elementNode.type="text";
		elementNode.setAttribute('d-model','{{test.b}}')
		CompilerUtil.model(elementNode,vm,"test.b");
		expect(elementNode.value).toEqual(
			"bbbb"
		)
	})
	it('测试Dmvvm构造',()=>{
		let parentNode = document.createElement("div");
		let elementNode = document.createElement("input");
		let textNode = document.createElement("div");
		textNode.innerHTML="{{test.a}}";
		elementNode.type="text";
		elementNode.setAttribute('d-model','test.b')
		CompilerUtil.model(elementNode,vm,"test.b");
		parentNode.appendChild(elementNode);
		parentNode.appendChild(textNode);
		let myDemo = new Dmvvm({
			data:vm.data,
			el:parentNode
		})
		expect(elementNode.value).toEqual("bbbb")
		expect(textNode.textContent).toEqual("aaaa")
	})
	it("测试Dep",()=>{
		let dep = new Dep();
		let parentNode = document.createElement("div");
		let elementNode = document.createElement("input");
		let textNode = document.createElement("div");
		textNode.innerHTML="{{test.a}}";
		elementNode.type="text";
		elementNode.setAttribute('d-model','test.b')
		CompilerUtil.model(elementNode,vm,"test.b");
		parentNode.appendChild(elementNode);
		parentNode.appendChild(textNode);
		let myDemo = new Dmvvm({
			data:vm.data,
			el:parentNode
		})
		dep.addSubscriber(new Watcher(myDemo,"test.b",(newValue)=>{}));
		dep.recognize();
	})

})
