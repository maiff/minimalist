import { createStore } from 'redux'
import todoApp from '../reducers'


let store = createStore(todoApp, {
  todos: [
    {
      id: 0,
      text: '下拉添加',
      completed: false
    },
    {
      id: 1,
      text: '左滑删除',
      completed: false
    },
    {
      id: 2,
      text: '右滑标记已完成',
      completed: false
    },
    {
      id: 3,
      text: '摇动删除已完成',
      completed: false
    },
    {
      id: 4,
      text: '长按编辑条目',
      completed: false
    }
  ]
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index')
    store.replaceReducer(nextRootReducer)
  })
}

export default store