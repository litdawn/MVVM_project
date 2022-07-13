import Compiler from "./Compiler";


class D_MVVM {
    el;
    data;
    constructor(options_object) {
        this.el = options_object.el;
        this.data = options_object.data;
        console.log(this.el)
        console.log(this.data)
        if(this.el){
            let thi = new Compiler(this.el,this);
        }
    };


}
export default D_MVVM;