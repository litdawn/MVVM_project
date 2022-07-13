/**
 * 更新函数，传入节点和更新值。
 */
const Updater = {
    textUpdater(node, value){
        node.textContent = value;

    },

    modelUpdater(node, value){
        node.value = value;
    }
}
export {Updater}