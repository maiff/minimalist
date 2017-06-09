import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import AlloyFinger from '../common/AlloyFinger'
import store from '../../store/'
import { deleteTodo, modify } from '../../actions'
import url from '../../baseUrl'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.x = 0
    this.y = 0
    this.hasSetedX = false
    this.state = {
      style: {
        opacity: props.completed ? 0.5 : 1,
        textDecoration: props.completed ? 'line-through' : 'none',
        marginLeft: 0
      }
    }

    this.id = props.todoId
    this.changeDone = props.changeDone
    this.completed = props.completed
    this.text = props.text
  }
  onPressMove (evt) {
    console.log(this.x, this.completed)
    this.x += evt.deltaX
    this.y += evt.deltaY
    if (evt.deltaX > 0 && this.y < 10) {
      this.rightSwip()
    } else if (evt.deltaX < 0 && this.y < 10) {
      this.leftSwip()
    }
    // evt.stopPropagation()
  }
  rightSwip () {
    if (this.x > 20) {
      if (this.hasSetedX === false) {
        this.completed = !this.completed
        this.changeDone()
        this.hasSetedX = true
      }
    } else if (this.x < 20 && this.x > 0) {
      this.setOpacity(this.x)
    }
  }
  leftSwip () {
    if (this.x < -30) {
      if (window.confirm('是否删除本条目？')) {
        window.fetch(`${url}/todo/${this.id}/`, {
          method: 'DELETE'
        })
        store.dispatch(deleteTodo(this.id))
      } else {
        this.init()
      }
    } else if (this.x > -30 && this.x < 0) {
      this.setMarginLeft(this.x)
    }
  }
  setMarginLeft (x) {
    this.setState({
      style: {
        marginLeft: x + 'px'
      }
    })
  }
  setOpacity (x) {
    this.completed ? this.setState({
      style: {
        opacity: (50 + x * 2.5) * 0.01
      }
    }) : this.setState({
      style: {
        opacity: (100 - x * 2.5) * 0.01
      }
    })
  }
  init () {
    setImmediate(() => {
      this.hasSetedX = false
      this.x = 0
      this.y = 0
      this.initOpacity(this.completed)
    })
  }
  initOpacity (completed) {
    completed ? this.setState({
      style: {
        opacity: 0.5,
        textDecoration: 'line-through'
      }
    })
    : this.setState({
      style: {
        opacity: 1,
        textDecoration: 'none'
      }
    })
  }
  modify (evt) {
    evt.preventDefault()
    store.dispatch(modify(this.id, this.props.text))
    return false
  }
  render () {
    return (
      <AlloyFinger onPressMove={this.onPressMove.bind(this)} onTouchEnd={this.init.bind(this)} onLongTap={this.modify.bind(this)}>
        <p className={css(styles.smallerFontSize)} style={{...this.state.style, 'userSelect': 'none', 'touchCallout': 'none'}}>{this.props.text}</p>
      </AlloyFinger>
    )
  }
}




const styles = StyleSheet.create({
  'smallerFontSize': {
    fontSize: '0.8rem',
    width: '100%',
    display: 'block',
    '-webkit-touch-callout': 'none'
  }
})

export default Todo
