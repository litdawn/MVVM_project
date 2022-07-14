/**
 * @file 实现更新函数，传入节点和更新值，更新节点内容。
 */
const Updater = {
    /**
     * 更新文本
     * @param node {Object}
     * @param value {string}
     */
    textUpdater(node, value){
        node.textContent = value;

    },
    /**
     * 更新输入框
     * @param node {Object}
     * @param value {any}
     */
    modelUpdater(node, value){
        node.value = value;
    }
    //TODO 待补充
}
export {Updater}