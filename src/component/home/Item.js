import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import AlloyFinger from '../common/AlloyFinger'


class Item extends React.Component {
  constructor (props) {
    super(props)
    this.x = 0
    this.isDone = false
    this.hasSetedX = false
    this.state = {
      style: {
        opacity: 1,
        textDecoration: 'none'
      }
    }
  }
  onPressMove (evt) {
    console.log(this.x,this.isDone)
    this.x += evt.deltaX
    if (evt.deltaX > 0) {
      this.rightSwip()
    }
  }
  rightSwip () {
    if (this.x > 10) {
      if (this.hasSetedX === false) {
        this.isDone = !this.isDone
        this.hasSetedX = true
      }
    } else {
      this.setOpacity(this.x)
    }
  }
  setOpacity (x) {
    this.isDone ? this.setState({
      style: {
        opacity: (50 + x * 5) * 0.01
      }
    }) : this.setState({
      style: {
        opacity: (100 - x * 5) * 0.01
      }
    })
  }
  init () {
    setImmediate(() => {
      this.hasSetedX = false
      this.x = 0
      this.initOpacity(this.isDone)
    })
  }
  initOpacity (isDone) {
    isDone ? this.setState({
      style: {
        opacity: 0.5,
        textDecoration: 'line-through'
      }
    }) :
    this.setState({
      style: {
        opacity: 1,
        textDecoration: 'none'
      }
    })
  }
  render() {
    return (
      <AlloyFinger onPressMove={this.onPressMove.bind(this)} onTouchEnd={this.init.bind(this)}>
        <p className={css(styles.smallerFontSize)} style={this.state.style}>{this.props.content}</p>
      </AlloyFinger>
    )
  }
}




const styles = StyleSheet.create({
  'smallerFontSize': {
    fontSize:'0.8rem'
  }
})

export default Item