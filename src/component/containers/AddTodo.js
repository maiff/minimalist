import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../../actions/'
import { StyleSheet, css } from 'aphrodite'

let input
let AddTodo = ({ dispatch, addInputOnBlur }) => {
  return (
    <div>
      <input className={css(styles.fontSize)} 
        ref={(node) => { input = node }} 
        onBlur={e => {
          addInputOnBlur()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }} type='text' />
    </div>
  )
}
AddTodo = connect()(AddTodo)


const styles = StyleSheet.create({
  fontSize: {
    fontSize: '0.8rem',
    width: '100%',
    margin: 0,
    padding: 0,
    '-webkit-appearance': 'caret'
  }
})
export { AddTodo, input}