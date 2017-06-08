import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import AlloyFinger from './component/common/AlloyFinger'

import {AddTodo, input} from './component/containers/AddTodo'
import TodoList from './component/home/TodoList'

import { deleteTodoDone } from './actions/'

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
  componentDidMount () {
    var shakeThreshold = 1500 // 定义一个摇动的阈值
    var lastUpdate = 0 // 记录上一次摇动的时间
    var x, y, z, lastX, lastY, lastZ // 定义x、y、z记录三个轴的数据以及上一次触发的数据

    // 监听传感器运动事件
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler, false)
    }

    // 运动传感器处理
    function deviceMotionHandler (eventData) {
      var acceleration = eventData.accelerationIncludingGravity // 获取含重力的加速度
      var curTime = new Date().getTime()

        // 100毫秒进行一次位置判断
      if ((curTime - lastUpdate) > 100) {
        var diffTime = curTime - lastUpdate
        lastUpdate = curTime

        x = acceleration.x
        y = acceleration.y
        z = acceleration.z

        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000
            // 前后x, y, z间的差值的绝对值和时间比率超过了预设的阈值，则判断设备进行了摇晃操作
        if (speed > shakeThreshold) {
          window.confirm('是否删除已完成条目') && store.dispatch(deleteTodoDone())
        }

        lastX = x
        lastY = y
        lastZ = z
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
      this.inputInit()
    }
  }
  changeText () {
    this.inputInit(store.getState().modify.text)
  }
  inputInit (text) {
    input.focus()
    text && (input.value = text)
    this.setState({
      inputShow: true,
      style: {
        marginTop: '0%'
      }
    })
  }
  init () {
    this.x = 0
    this.y = 0
  }
  render () {
    return (
      <Provider store={store}>
        <AlloyFinger onPressMove={this.onPressMove.bind(this)} onTouchEnd={this.init.bind(this)} onLongTap={this.changeText.bind(this)}>
          <div className={css(styles.padding)} style={this.state.style}>
            <AddTodo addInputOnBlur={this.addInputOnBlur.bind(this)} />
            {
            (<div style={{
              transtion: 'all .5s',
              display: this.state.inputShow ? 'none' : 'block'
            }}>

              <TodoList />
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
