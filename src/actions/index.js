let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})


export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const deleteTodoDone = () => ({
  type: 'DELETE_TODO_HASCOMPLETED'
})

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id
})

export const modifyTodo = (id, text) => ({
  type: 'MODIFY_TODO',
  id,
  text
})
export const setFalse = () => ({
  type: 'SET_FLAG_TO_FALSE'
})
export const modify = (id, text) => ({
  type: 'MODIFY_ID',
  id,
  text
})