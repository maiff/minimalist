import React, { PropTypes } from 'react'
import { deleteTodoDone } from '../../actions/'
import { connect } from 'react-redux'
import store from '../../store/'
class Shark extends React.Component {
  constructor (props) {
    super(props)
    this.dispatch = props.dispatch
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
      if ((curTime - lastUpdate) > 100 && store.getState().todos.length !== 0) {
        var diffTime = curTime - lastUpdate
        lastUpdate = curTime

        x = acceleration.x
        y = acceleration.y
        z = acceleration.z

        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000
            // 前后x, y, z间的差值的绝对值和时间比率超过了预设的阈值，则判断设备进行了摇晃操作
        if (speed > shakeThreshold) {
          this.dispatch(deleteTodoDone())
        }

        lastX = x
        lastY = y
        lastZ = z
      }
    }
  }
  render () {
    return null
  }
}


Shark = connect()(Shark)

export default Shark