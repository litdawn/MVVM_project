import Compiler from "./Compiler.js";


class Dmvvm {
    constructor(options_object) {
        this.el = options_object.el;
        this.data = options_object.data;

        if(this.el){
            //数据劫持
            new Observer(this.data);
            //模板编译
            new Compiler(this);
        }
    };
}

window.Dmvvm = Dmvvm;