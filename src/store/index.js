import { createStore } from 'redux'
import todoApp from '../reducers'


let store = createStore(todoApp, {
  todos: [
    {
      id: 1,
      text: 'ttttt',
      completed: false
    },
    {
      id: 2,
      text: 'aaaaaa',
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