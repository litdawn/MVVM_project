/**
 * 是否是元素节点
 * @param node
 */
export function isElementNode(node){
    return node.nodeType === 1;
}

/**
 * 是否是文本节点
 * @param node
 */
export function isTextNode(node){
    return node.nodeType === 3;
}

/**
 * 是否是指令，即含有d-?=""
 */
export function isDirective(name){
    return name.indexOf("d-")===0;
}

/**
 * 是否为对象
 */
export function isObject(object){
    return typeof object==='object';
}

/**
 * 解析{{}}中内容(特别是a.b.c嵌套后)
 * @param vm
 * @param expr
 * @return data中真正的值
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
 * 根据解析出的{{}}中的真实值，替换expression中的变量名
 */
const textRE =  /{{([^}]+)}}/g;
export  function getTextValue(expressionWithDump,vm){
    let expression = expressionWithDump;
    let content;
    while((content=textRE.exec(expressionWithDump))!==null){
        expression = expression.replace("{{"+content[1]+"}}",findValue(vm,content[1]));
    }
    return expression;
}




