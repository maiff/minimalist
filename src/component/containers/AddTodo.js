import React from 'react'
import { connect } from 'react-redux'
import { addTodo, modifyTodo, setFalse } from '../../actions/'
import { StyleSheet, css } from 'aphrodite'
import store from '../../store/'
import url from '../../baseUrl'
let input
let AddTodo = ({ dispatch, addInputOnBlur, getState}) => {
  return (
    <div>
      <input className={css(styles.fontSize)} 
        ref={(node) => { input = node }} 
        onBlur={e => {
          addInputOnBlur()
          if (!input.value.trim()) {
            return
          }
          let localStore = store.getState()
          if (localStore.modify.flag) {
            window.fetch(`${url}/todo/${localStore.modify.id}/`, {
              method: 'PUT',
              body: JSON.stringify({text: input.value, completed: localStore.todos.find((e) => e.id === localStore.modify.id).completed})
            })
            dispatch(modifyTodo(localStore.modify.id, input.value))
          } else {
            window.fetch(`${url}/todo/`, {
              method: 'POST',
              body: JSON.stringify({text: input.value})
            })
            dispatch(addTodo(input.value))
          } 
          dispatch(setFalse())
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