import React, { PropTypes } from 'react'
import Todo from './Todo'
import { toggleTodo } from '../../actions/'
import { connect } from 'react-redux'

let TodoList = ({ todos, changeDone }) => (
  <div>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        changeDone={() => changeDone(todo.id)}
      />
    )}
  </div>
)



const mapStateToProps = (state) => {
  console.log(state)
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = {
  changeDone: toggleTodo
}

TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default TodoList