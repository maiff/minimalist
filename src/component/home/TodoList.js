import React, { PropTypes } from 'react'
import Todo from './Todo'
import { toggleTodo } from '../../actions/'
import { connect } from 'react-redux'

let TodoList = ({ todos, changeDone }) => (
  <div>
    {todos.map(todo =>
      <Todo
        todoId={todo.id}
        key={todo.id}
        text={todo.text}
        changeDone={() => changeDone(todo.id)}
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