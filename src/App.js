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

export default App
