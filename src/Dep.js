/**
 * 发布订阅
 */
class Dep{
	subscribers;
	static target;
	constructor() {
		this.subscribers=[]
	}

	/**
	 * 添加订阅者
	 * @param watcher
	 */
	addSubscriber(watcher){
		console.log("add",watcher)
		this.subscribers.push(watcher);
	}

	/**
	 * 判断订阅者是否更新
	 */
	recognize(){
		console.log("recognize");
		this.subscribers.forEach(watcher=>{
			console.log("rec",watcher)
			watcher.compare();
		})
	}
}

export default Dep;
window.Dep = Dep;