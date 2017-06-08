const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id) 
          ? {...todo, completed: !todo.completed}
          : todo
      )
    case 'DELETE_TODO_HASCOMPLETED':
      return state.filter(
        todo =>
          todo.completed === false
        )
    case 'DELETE_TODO':
      return state.filter(
        todo => 
          todo.id !== action.id
      )
    case 'MODIFY_TODO':
      return state.map(todo =>
        (todo.id === action.id) 
          ? {...todo, text: action.text}
          : todo
      )
    case 'SET_TODO':
      return action.todoList
    default:
      return state
  }
}

export default todos
