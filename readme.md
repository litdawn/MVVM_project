## DMVVM框架

>一个简单的MVVM框架


###1. 文件结构
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
│      Dep.js
│      Dmvvm.js
│      Observer.js
│      Updater.js
│      util.js
│      Watcher.js
│
├─test
│      unitTest.js
└─testcov.png       //报告截图
```
###2.框架功能
***
数据劫持
<br>发布订阅模式
<br>单向绑定：插值表达式的解析<br>
双向绑定："d-model"属性

###3.框架使用
***
####3.1 框架的引入
```<script type="module" src="../src/Dmvvm.js"/>```
####3.2 框架的使用
```
<input type="text" d-model="title.m">
```
```
<div>{{title.n}}</div>
```

```
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
