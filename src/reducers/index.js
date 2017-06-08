import { combineReducers } from 'redux'
import todos from './todos'
import modify from './modify'

const todoApp = combineReducers({
  todos,
  modify
})

export default todoApp
