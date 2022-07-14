/**
 * @file 实现发布订阅模式
 */
class Dep{
	subscribers;
	static target;
	constructor() {
		this.subscribers=[]
	}

	/**
	 * 添加订阅目标
	 * @param watcher
	 */
	addSubscriber(watcher){
		this.subscribers.push(watcher);
		console.log(this.subscribers,"in add");
	}

	/**
	 * 判断订阅目标是否更新
	 */
	recognize(){
		console.log(this.subscribers,"in rec");
		this.subscribers.forEach(watcher=>{
			watcher.compare();
		})
	}
}

export default Dep;
window.Dep = Dep;