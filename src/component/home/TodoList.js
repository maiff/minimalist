import React from 'react'
import Todo from './Todo'
import { toggleTodo } from '../../actions/'
import { connect } from 'react-redux'
import url from '../../baseUrl'
let TodoList = ({ todos, changeDone }) => (
  <div>
    {todos.map(todo =>
      <Todo
        todoId={todo.id}
        key={todo.id}
        {...todo}
        changeDone={() => {
          window.fetch(`${url}\\todo\\${todo.id}\\`, {
            method: "PUT",
            body: JSON.stringify({text: todo.text, completed: !todo.completed})
          })
          changeDone(todo.id)
        }}
      />
    )}
  </div>
)

function getTodos (state) {
  return state.todos
}

const mapStateToProps = (state) => ({
    todos:  getTodos (state)
})

const mapDispatchToProps = {
  changeDone: toggleTodo
}

TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default TodoList