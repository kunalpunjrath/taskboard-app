import { combineReducers } from 'redux'
import {
  routerReducer
} from 'react-router-redux'

import lists from './lists'

const userId = 'cjdaeil5len6w0144b44lgqk9'

const users = (state = {userId}, action) => {
 /*  switch (action.type) {
    case 'ADD_CARD':
      return {
        ...state,
        {
          id: action.id,
          title: action.title,
          completed: false
        }
      }
    default:
      return state
  } */
  return state
}

const rootReducer = combineReducers({
  routing: routerReducer,
  users,
  lists,
})

export default rootReducer