import {Updater} from "./Updater.js";
import {findValue,getTextValue,setValue} from "./util.js";
import Watcher from "./Watcher.js";

/**
 * @file 处理d-命令的函数对象
 */
const CompilerUtil ={

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
    },

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
    },

    //TODO 待补充
    /**
     * d-html
     * @param node
     * @param vm
     * @param expression
     */
    html(node,vm,expression){

    }
}


export{CompilerUtil}