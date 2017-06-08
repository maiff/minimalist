import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import AlloyFinger from './component/common/AlloyFinger'

import {AddTodo, input} from './component/containers/AddTodo'
import TodoList from './component/home/TodoList'

import Shark from './component/home/Shark'

import { Provider } from 'react-redux'

import store from './store/'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.y = 0
    this.x = 0
    this.state = {
      inputShow: false,
      style: {
        marginTop: '-16%'
      }
    }
  }
  addInputOnBlur () {
    this.setState({
      inputShow: false,
      style: {
        marginTop: '-16%'
      }
    })
  }
  onPressMove (evt) {
    this.y += evt.deltaY
    this.x += evt.deltaX
    if (this.y > 20 && this.x < 10) {
      input.focus()
      this.setState({
        inputShow: true,
        style: {
          marginTop: '0%'
        }
      })
    }
  }
  init () {
    this.x = 0
    this.y = 0
  }
  render () {
    return (
      <Provider store={store}>
        <AlloyFinger onPressMove={this.onPressMove.bind(this)} onTouchEnd={this.init.bind(this)}>
          <div className={css(styles.padding)} style={this.state.style}>
            <AddTodo addInputOnBlur={this.addInputOnBlur.bind(this)} />
            {
            (<div style={{
              transtion: 'all .5s',
              display: this.state.inputShow ? 'none' : 'block'
            }}>

              <TodoList />
              <Shark />
            </div>)}
          </div>
        </AlloyFinger>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  padding: {
    padding: '5%',
    minHeight: '95%',
    transition: 'all .3s'
  }
})


export default App
