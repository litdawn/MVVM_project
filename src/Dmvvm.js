import Compiler from "./Compiler.js";
import Observer from "./Observer.js";
/**
 * @file 框架接入点
 */
class Dmvvm {
    constructor(options_object) {
        this.el = options_object.el;
        this.data = options_object.data;

        if(this.el){
            //TODO 数据劫持
            new Observer(this.data);
            //TODO 数据代理
            //TODO 模板编译
            new Compiler(this);
        }
    };
}
export default Dmvvm;
window.Dmvvm = Dmvvm;