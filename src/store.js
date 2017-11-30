import { createStore, combineReducers } from 'redux';
import {loadState, saveState } from './localStorage';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state;
  }
}

const visibilityFilter = (state='SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state

  }
}

// const rootReducer = combineReducers({
//   todos,
//   visibilityFilter
// })
var initialState = new Array(60).fill(false)
var persistedState = loadState()
const rootReducer = (state = initialState, action) => {
  if (action.type === 'TOGGLE_WINDOW') {
    var today = new Date()
    var dateOfWindow = new Date(`12-${action.index + 1}-2017`)
    if (dateOfWindow < today) {
      var newState = state.concat([])
      newState[action.index] = !newState[action.index]
      return newState
    }
    return state
  }
  return state
}

const store = createStore(
  rootReducer,
  persistedState
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store