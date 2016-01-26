/**
 * Author :  neron
 * time   : 2016/1/25
 * description: ...
 */
/*
* 应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。
* 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。
* 为了描述 action 如何改变 state 树，你需要编写 reducers。
* */
import { combineReducers, createStore } from 'redux';
import { Provider, connect, Connector } from 'react-redux';
import React,  { Component } from 'react';

//构造 reducer&store
const reducer = combineReducers(reducers);
const store = createStore(reducer);

export class App extends Component {
    constructor(){
        super();
    }
    render(){
        /** Provider 接收一个 props 为 store
         * Provider 的 children 必须为一个 function，
         * 因为 Provider 内部会执行 this.props.children()
         */
        return (
            <Provider store={store}>
                {() => <TodoApp />}
            </Provider>
        );
    }
}

export function TodoApp(state = initialState, action){
    switch (action.type){
        case ADD_TODO:
            return [{
                id: (state.length === 0) ? 0 : state[0].id + 1,
                marked: false,
                text: action.text
            }, ...state];
            break;
    }
}


/*
//reducer
function counter(state = 0, action){
    switch (action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function visibilityFilter(state = 'SHOW_ALL', action){
    switch (action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

function todos(state = [], action){
    switch (action.type){
        case 'ADD_TODO':
            return [...state, {
                text: action.text,
                completed: false
            }];
        case 'COMPLETE_TODO':
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}

let reducer = combineReducers(visibilityFilter, todos);

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(reducer);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subcripe(() => {
    console.log(store.getState());
});

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});

*/
