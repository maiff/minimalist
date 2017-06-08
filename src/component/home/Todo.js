import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import AlloyFinger from '../common/AlloyFinger'


class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.x = 0
    this.y = 0
    this.hasSetedX = false
    this.state = {
      style: {
        opacity: 1,
        textDecoration: 'none'
      }
    }

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
    } else {
      this.setOpacity(this.x)
    }
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
  render () {
    return (
      <AlloyFinger onPressMove={this.onPressMove.bind(this)} onTouchEnd={this.init.bind(this)}>
        <p className={css(styles.smallerFontSize)} style={this.state.style}>{this.text}</p>
      </AlloyFinger>
    )
  }
}




const styles = StyleSheet.create({
  'smallerFontSize': {
    fontSize: '0.8rem'
  }
})

export default Todo
