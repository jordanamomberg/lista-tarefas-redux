import { createStore, combineReducers } from 'redux';

import todos from './reducers/todos'

const reducers= combineReducers({
    todos: todos, 
        // console.log("Reducer chamando...")
        // console.log(state, ' ', action)
        // return { 
        //     title: "", 
        //     description: "",   
    //     }
    // }
})

function storeConfig() {
    return createStore(reducers)
}

export default storeConfig();