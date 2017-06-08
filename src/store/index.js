import { createStore } from 'redux'
import todoApp from '../reducers'
import { setTodo } from '../actions'
import url from '../baseUrl'

let store = createStore(todoApp, {
  todos: []
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index')
    store.replaceReducer(nextRootReducer)
  })
}

// window.fetch(`${url}/todo/`).then((data) => {
//   return data.json()
// }).then((data) => console.log(data))

async function getTodoList () {
  let data = await window.fetch(`${url}/todo/`)
  let todoList = await data.json()
  console.log(todoList)
  window.nextTodoId = todoList[todoList.length - 1].id + 1
  store.dispatch(setTodo(todoList))
}

getTodoList()
export default store
