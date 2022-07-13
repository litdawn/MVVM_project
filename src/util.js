
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


