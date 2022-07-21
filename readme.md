## DMVVM框架

> 一个简单的MVVM框架

### 1. 文件结构

***

```
│
├─coverage          //单测覆盖率报告
│
├─demo
│      demo.html    //使用示例
├─src
│      Compiler.js
│      CompilerUtil.js
│      Dep.js         //实现订阅
│      Dmvvm.js
│      Observer.js    //数据劫持
│      Updater.js
│      util.js
│      Watcher.js
│
├─test
│      unitTest.js
│
├─readme.md         //本文件
│
└─testcov.png       //报告截图
```

### 2.框架功能

***

#### 2.1数据劫持

##### 2.1.1 Observer

```js
	/**
	 * @param data {Object} 某传入对象
	 */
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
				return value;
			},
			set(update){
				if(update!==value) {
					if(isObject(update))
						that.observe(update);
					value = update;
					dep.recognize();
				}
			}
		})
	}
```





#### 2.2发布订阅模式

##### 2.2.1 DEP

```javascript
	/**
	 * 添加订阅目标
	 * @param watcher {Watcher}
	 */
	addSubscriber(watcher){
		this.subscribers.push(watcher);
	}

	/**
	 * 判断订阅目标是否更新
	 */
	recognize(){
		this.subscribers.forEach(watcher=>{
			watcher.compare();
		})
	}
```

##### 2.2.2 Watcher

```js
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
```



#### 2.3单向绑定：插值表达式的解析

##### 2.3.1 CompilerUtil

```js
    /**
     * 文本,插值表达式
     * @param node {Object}
     * @param vm {Object}
     * @param expressionWithDump {string}
     */
    text(node,vm,expressionWithDump){
        let textRE = /{{(.+?)}}/g;
        let content;
        let value = getTextValue(expressionWithDump,vm);
        // console.log(value);
        while((content=textRE.exec(expressionWithDump))!==null){
            new Watcher(vm,content[1],(newValue)=>{
                Updater["textUpdater"](node,getTextValue(expressionWithDump,vm));
            });
        }
        Updater["textUpdater"](node,value);
    }
```

##### 2.3.2 Updater

```js
    /**
     * 更新文本
     * @param node {Object}
     * @param value {string}
     */
    textUpdater(node, value){
        node.textContent = value;
    },
```

##### 2.3.3 util

```js
/**
 * 解析对象属性真实值
 * @param vm {Object}
 * @param expr {string} 形如（student.class.classNum）
 * @return {any}
 */
export function findValue(vm,expr){
    let locators = expr.split(".");
    let value = vm.data;
    for(let i=0;i<locators.length;i++){
        value = value[locators[i]];
    }
    return value;
}

/**
 * 正则寻找插值表达式内容
 * @param expressionWithDump{string}
 * @param vm {Object}
 * @return {string}
 */
const textRE =  /{{(.+?)}}/g;
export  function getTextValue(expressionWithDump,vm){
    let expression = expressionWithDump;
    let content;
    while((content=textRE.exec(expressionWithDump))!==null){
        expression = expression.replace("{{"+content[1]+"}}",findValue(vm,content[1]));
    }
    return expression;
}

```

#### 2.4双向绑定："d-model"属性

##### 2.4.1 CompilerUtil

```js
    /**
     * d-model输入框
     * @param node {Object}
     * @param vm {Object}
     * @param expression {string}
     */
    model(node,vm,expression){
        new Watcher(vm,expression,(newValue)=>{
            Updater['modelUpdater'](node,newValue);
        })
        node.addEventListener('input',(event)=>{
            let newValue = event.target.value;
            setValue(vm,expression,newValue);
        })
        Updater['modelUpdater'](node,findValue(vm,expression));
    }
```

##### 2.4.2 util

```js
/**
 * 根据输入框的输入，改变值
 * @param vm {Object}
 * @param expr {string}
 * @param newValue {any}
 */
export function setValue(vm,expr,newValue){
    let locators = expr.split(".");
    let value = vm.data;
    for(let i=0;i<locators.length-1;i++){
        value = value[locators[i]];
    }
    value[locators[locators.length-1]]=newValue;
}
```

### 3.框架使用

***

#### 3.1 框架的引入

```html
<script type="module" src="../src/Dmvvm.js"/>
```



#### 3.2 框架的使用

```html
<input type="text" d-model="title.m">
```

```html
<div>{{title.n}}</div>
```

```html
<script>
let myDemo = new Dmvvm({
        el: '#app',
        data: {
            title: {
                m: 'demo',
                n: 'hhdd'
            }
        }
    });
</script>
```
