/**
 * 是否是元素节点
 * @param node
 * @return {boolean}
 */
export function isElementNode(node){
    return node.nodeType === 1;
}

/**
 * 是否是文本节点
 * @param node {Object}
 * @return {boolean}
 */
export function isTextNode(node){
    return node.nodeType === 3;
}

/**
 * 是否是指令，即含有d-?=""
 * @param name {string}
 * @return {boolean}
 */
export function isDirective(name){
    return name.indexOf("d-")===0;
}

/**
 * 是否为对象
 * @return {boolean}
 */
export function isObject(object){
    return typeof object==='object';
}

/**
 * 解析对象属性真实值(特别是嵌套后)
 * @param vm {Object}
 * @param expr {string}
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
 * @type {RegExp}
 */
const textRE =  /{{(.+?)}}/g;
/**
 *
 * @param expressionWithDump{string}
 * @param vm {Object}
 * @return {string}
 */
export  function getTextValue(expressionWithDump,vm){
    let expression = expressionWithDump;
    let content;
    while((content=textRE.exec(expressionWithDump))!==null){
        expression = expression.replace("{{"+content[1]+"}}",findValue(vm,content[1]));
    }
    return expression;
}

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





