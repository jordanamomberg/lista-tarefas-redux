import { findDOMNode } from "react-dom";

const initialState = { 
  data: [], 
}

const todos = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          data: [...state.data, ...action.payload]
          };

      case 'DELETE_TODO':
        const newTodos = state.data.filter(task => task.id !== action.payload);
        return {
          ...state,
          data: newTodos,
          };

      case 'EDIT_TODO':
            const indexTodo = state.data.findIndex(item => item.id === action.payload.id) 
            const todosNew = state.data[indexTodo] = action.payload.todo;
            return {
              ...state,
              data: todosNew 
            }
      default:
        return state
    }
  }
  
  export default todos