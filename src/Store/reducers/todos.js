const initialState = { 
  title: "", 
  description: "", 
}

const todos = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          title: action.payload
          }
      default:
        return state
    }
  }
  
  export default todos