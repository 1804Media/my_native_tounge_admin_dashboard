import { createStore } from 'redux'

const initialState = {
  sidebarShow: 'responsive',
  loginedUser: "",
  loading: true
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    case 'LOGIN':
      return { ...state, ...rest }
    case 'LOADING':
      return { ...state, ...rest }
    case 'LOGOUT':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store