import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from '../redux';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

let reducer = (state={number:0},action)=>{
	if(action === undefined) return state;
	switch(action.type){
		case INCREASE:
			return {number:state.number+action.amount};
		case DECREASE:
			return {number:state.number-action.amount};
		default:
			return state;
	}
};

let store = createStore(reducer);

export default class Counter extends React.Component{
	constructor(){
		super();
		this.state = {number:store.getState().number};
	}

	componentWillMount(){
		this.unsubscribe = store.subscribe(()=>{
			this.setState({
				number:store.getState().number
			})
		})
	}

	componentWillUnMount(){
		this.unsubscribe();
	}

	render(){
		return (
			<div>
				<p>{this.state.number}</p>
				<button onClick={()=>store.dispatch({type:INCREASE,amount:3})}>+</button>
				<button onClick={()=>store.dispatch({type:DECREASE,amount:1})}>-</button>
			</div>
		)
	}
}

ReactDOM.render(<Counter />,document.querySelector('#root'));


