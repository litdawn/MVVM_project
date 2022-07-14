import {Updater} from "./Updater.js";
import {findValue,getTextValue} from "./util.js";
import Watcher from "./Watcher.js";

/**
 * 处理d-命令的函数对象
 */
const CompilerUtil ={

    text(node,vm,expressionWithDump){
        let textRE = /{{([^}]+)}}/g;
        let content;
        let value = getTextValue(expressionWithDump,vm);
        console.log(value);
        let expression = expressionWithDump;
        while((content=textRE.exec(expressionWithDump))!==null){
            new Watcher(vm,content[1],(newValue)=>{
                Updater["textUpdater"](node,getTextValue(vm,expressionWithDump));
            });
        }
        Updater["textUpdater"](node,value);
    },
    model(node,vm,expression){
        new Watcher(vm,expression,(newValue)=>{
            Updater['modelUpdater'](node,findValue(vm,expression));
        })
        Updater['modelUpdater'](node,findValue(vm,expression));
    },

    html(node,vm,expression){

    }

}
export{CompilerUtil}