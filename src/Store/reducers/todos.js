
const initialState = { 
  data: [], 
  search: '',
  todoSearchResult: []
}

const getTodoFilterResult = (todos, search ) => {
  return search !== '' ? todos.filter(t => t.descricao?.includes(search) || t.titulo?.includes(search)) : []
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
            };
      case 'TODO_SEARCH': 
            console.log(action.payload)
            return {
              ...state,
              search: action.payload
              // todoSearchResult: getTodoFilterResult(state.todos, action.payload)
          };

      // description: 'Ler livro'
      // list: [{
      //   _id: 1, 
      //   description: 'Pagar a fatura do cartão', 
      //   done: true                              
      // }] 
      default:
        return state
    }
  }
  
  export default todos