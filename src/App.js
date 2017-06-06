import React from 'react'
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
        content: '摇动删除已完成',
        id: 0,
        isDone: false
      }, {
        content: '右滑标记已完成 √',
        id: 1,
        isDone: false
      }, {
        content: '下拉添加 √',
        id: 2,
        isDone: false
      }],
      style: {
        marginTop: '-16%'
      }
    }
  }
  componentDidMount () {
    var shakeThreshold = 1500 // 定义一个摇动的阈值
    var lastUpdate = 0 // 记录上一次摇动的时间
    var x, y, z, lastX, lastY, lastZ // 定义x、y、z记录三个轴的数据以及上一次触发的数据

    const self = this
    // 监听传感器运动事件
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler, false)
    }

    // 运动传感器处理
    function deviceMotionHandler (eventData) {
      var acceleration = eventData.accelerationIncludingGravity // 获取含重力的加速度
      var curTime = new Date().getTime()

        // 100毫秒进行一次位置判断
      if ((curTime - lastUpdate) > 100 && self.state.todoList.length !== 0) {
        var diffTime = curTime - lastUpdate
        lastUpdate = curTime

        x = acceleration.x
        y = acceleration.y
        z = acceleration.z

        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000
            // 前后x, y, z间的差值的绝对值和时间比率超过了预设的阈值，则判断设备进行了摇晃操作
        if (speed > shakeThreshold) {
          window.confirm('是否删除全部已完成？') && self.setState((prevState, props) => {
            console.log(props)
            let todoList = prevState.todoList
            todoList = todoList.filter((item, index) => {
              if (item.isDone === true) return false
              return true
            })
            return {
              todoList: todoList
            }
          })
        }

        lastX = x
        lastY = y
        lastZ = z
      }
    }
  }
  changeDoneState (id, state) {
    this.setState((prevState, props) => {
      console.log(props)
      let todoList = prevState.todoList
      todoList.map((item, index) => {
        if (item.id === id) item.isDone = state
        return item
      })
      return {
        todoList: todoList
      }
    })
  }
  textOnBlur (event) {
    this.setState((prevState, props) => ({
      inputShow: false,
      todoList: prevState.value === '' ? prevState.todoList : [{content: this.textInput.value, id: prevState.todoList.length, isDone: false}, ...prevState.todoList],
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
          {
          (<div style={{
            transtion: 'all .5s',
            display: this.state.inputShow ? 'none' : 'block'
          }}>

            {
              this.state.todoList.map((c, index) =>
                <Item content={c.content} itemID={c.id} key={c.id} changeDone={this.changeDoneState.bind(this)} />
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
// if (window.DeviceOrientationEvent) {
//   var lastAcc    // 用来存储上一次的deviceorientation事件
//   window.addEventListener('deviceorientation', function (event) {
//     var delA = Math.abs(event.alpha - lastAcc.alpha)    // alpha轴偏转角
//     var delB = Math.abs(event.beta - lastAcc.beta)    // beta轴偏转角
//     var delG = Math.abs(event.gamma - lastAcc.gamma)    // gamma轴偏转角
//     if ((delA > 15 && delB > 15) || (delA > 15 && delG > 15) || (delB > 15 || delG > 15)) {
//             // 用户设备摇动了，触发响应操作
//             // 此处的判断依据是任意两个轴篇转角度大于15度
//       alert('摇了')
//     }
//     lastAcc = event    // 存储上一次的event
//   })
// }


export default App
