import { createStore } from 'redux'
import todoApp from '../reducers'


let store = createStore(todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index')
    store.replaceReducer(nextRootReducer)
  })
}

export default store