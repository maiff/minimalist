import React from 'react'
import pic from './assets/img/avatar.png'
import { StyleSheet, css } from 'aphrodite'


import Item from './component/home/Item'
const App = () => {
  return (
    <div className={css(styles.padding)}>
      <Item content="左滑删除或者编辑"/>

      <Item content="右滑标记已完成 √"/>
    </div>
  );
};

const styles = StyleSheet.create({
  padding: {
    padding:'5%'
  }
})
if(window.DeviceOrientationEvent){
    var lastAcc;    // 用来存储上一次的deviceorientation事件
    document.addEventListener('deviceorientation', function(event) {
        var delA = Math.abs(event.alpha - lastAcc.alpha)    // alpha轴偏转角
        var delB = Math.abs(event.beta - lastAcc.beta)    // beta轴偏转角
        var delG = Math.abs(event.gamma - lastAcc.gamma)    // gamma轴偏转角
        if ( (delA > 15 && delB > 15) || (delA > 15 && delG > 15) || (delB > 15 || delG > 15)) {
            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是任意两个轴篇转角度大于15度
            alert('摇了')
        }
        lastAcc = event    // 存储上一次的event
    })
}

export default App
