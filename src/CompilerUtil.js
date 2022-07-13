import {Updater} from "./Updater";
import {findValue} from "./util";
import * as assert from "assert";

/**
 * 处理d-命令的函数对象
 */
const CompilerUtil ={

    text(node:Node,vm,expression){
        Updater["textUpdater"](node,findValue(vm,expression));


    },
    model(node,vm,expression){
        Updater['modelUpdater'](node,findValue(vm,expression));
    },

    html(node,vm,expression){

    }

}
export{CompilerUtil}