import React from 'react'
import pic from './assets/img/avatar.png'
import { StyleSheet, css } from 'aphrodite'
import AlloyFinger from './component/common/AlloyFinger'

import Item from './component/home/Item'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.y = 0
    this.x = 0
    this.textInput = null
    this.state = {
      value: '',
      inputShow: false,
      todoList: [{
        content: '左滑删除或者编辑',
        id: 0
      }, {
        content: '右滑标记已完成 √',
        id: 1
      }, {
        content: '下拉添加 √',
        id: 2
      }],
      style: {
        marginTop: '-16%'
      }
    }
  }
  textOnBlur (event) {
    this.setState((prevState, props) => ({
      inputShow: false,
      todoList: prevState.value === '' ? prevState.todoList : [{content: this.textInput.value, id: prevState.todoList.length}, ...prevState.todoList],
      value: '',
      style: {
        marginTop: '-16%'
      }
    }))
  }
  handleChange (event) {
    this.setState({value: event.target.value})
  }
  onPressMove (evt) {
    this.y += evt.deltaY
    this.x += evt.deltaX
    console.log(this.x, this.y)
    if (this.y > 20 && this.x < 10) {
      this.textInput.focus()
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
      <AlloyFinger onPressMove={this.onPressMove.bind(this)} onTouchEnd={this.init.bind(this)}>
        <div className={css(styles.padding)} style={this.state.style}>
          <input className={css(styles.fontSize)} ref={(input) => { this.textInput = input }} value={this.state.value} onBlur={this.textOnBlur.bind(this)} onChange={this.handleChange.bind(this)} type='text' />
          {this.state.inputShow ||
          (<div style={{
            transtion: 'all .5s'
          }}>

            {
              this.state.todoList.map((c, index) =>
                <Item content={c.content} key={c.id} />
              )
            }

          </div>)}
        </div>
      </AlloyFinger>
    )
  }
}

const styles = StyleSheet.create({
  padding: {
    padding: '5%',
    minHeight: '95%',
    transition: 'all .3s'
  },
  fontSize: {
    fontSize: '0.8rem',
    width: '100%',
    margin: 0,
    padding: 0,
    '-webkit-appearance': 'caret'
  }
})
if (window.DeviceOrientationEvent) {
  var lastAcc    // 用来存储上一次的deviceorientation事件
  window.addEventListener('deviceorientation', function (event) {
    var delA = Math.abs(event.alpha - lastAcc.alpha)    // alpha轴偏转角
    var delB = Math.abs(event.beta - lastAcc.beta)    // beta轴偏转角
    var delG = Math.abs(event.gamma - lastAcc.gamma)    // gamma轴偏转角
    if ((delA > 15 && delB > 15) || (delA > 15 && delG > 15) || (delB > 15 || delG > 15)) {
            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是任意两个轴篇转角度大于15度
      alert('摇了')
    }
    lastAcc = event    // 存储上一次的event
  })
}

export default App
