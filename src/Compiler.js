import {isElementNode, isTextNode, isDirective} from "./util.js";
import {CompilerUtil} from "./CompilerUtil.js";

class Compiler {
    el;
    vm;
    constructor(vm) {
        this.vm=vm;
        this.el = isElementNode(vm.el)?vm.el:document.querySelector(vm.el);
        if(this.el){
            //元素存在
            let fragment = this.toFragment(this.el);
            this.compile(fragment);
            this.el.appendChild(fragment);
            fragment=null;
        }
    };


    /**
     * 将节点放入文档碎片
     */
    toFragment(el){
        let fragment = document.createDocumentFragment();
        let childNode;
        while((childNode = el.firstChild)!==null){
            fragment.appendChild(childNode);
        }
        return fragment;
    };

    /**
     * 实际的编译过程
     * @param fragment 含有需编译内容的文档碎片
     */
    compile(fragment){
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node=>{
            if(isElementNode(node)){
                this.compileElement(node);
                this.compile(node);
            }else if(isTextNode(node)){
                this.compileText(node);
            }
        })
    };

    /**
     * 编译元素
     * @param node
     */
    compileElement(node){
        let allAttributes = node.attributes;
        Array.from(allAttributes).forEach(attr=>{
            let name = attr["name"];
            let value = attr["value"];
            if(isDirective(name)){
                let dirType = name.slice(2);
                let compilerUtilFunc= CompilerUtil[dirType];
                if(!compilerUtilFunc) {
                    console.warn("命令类型"+dirType+"不存在")
                }else {
                    compilerUtilFunc(node, this.vm, value);
                }
            }
        })
    };

    /**
     * 编译文本：尤其是带{{}}的
     * @param node
     */
    compileText(node){
        let textContent = node.textContent;
        let textRE = /{{([^}]+)}}/g;
        if(textRE.test(textContent)){
            CompilerUtil['text'](node,this.vm,textContent)
        }
    };

}
export default Compiler;
window.Compiler = Compiler;
