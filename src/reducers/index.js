import todos from './todos'
import modify from './modify'
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  todos,
  modify
})

export default todoApp
