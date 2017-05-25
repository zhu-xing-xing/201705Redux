//我们自己实现一个自己的redux


//创建仓库
const createStore = (reducer) => {
	let state;  //状态对象
	let listeners = [];  //监听函数数组

	//用来获取最新的状态
	let getState = () => state;


	//订阅仓库内的状态变化事件,当状态发生变化之后回调对应的监听函数
	let subscribe = (listener) => {
		listeners.push(listener);
		return () => {   	//订阅方法执行后,会返回一个取消订阅的函数,调用它可以取消订阅
			listeners = listeners.filter(l => listener !== l)
		}
	};

	//向仓库发送action
	let dispatch = (action) => {
		state= reducer(state, action);  //reducer有两个参数 传入老的state和action  然后返回一个新的state
		listeners.forEach(listener => listener()); //执行所有的监听函数  依次调用所有的订阅函数
	};

	dispatch();  //内部先执行一次


	return {
		getState,  //获取最新的状态对象
		subscribe, //原来订阅状态变化事件
		dispatch  //发射action
	}
};

export {createStore};