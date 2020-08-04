import { createStore, combineReducers } from 'redux';

import todos from './reducers/todos'

const reducers= combineReducers({
    todos: todos
})

function storeConfig() {
    return createStore(reducers)
}

export default storeConfig();