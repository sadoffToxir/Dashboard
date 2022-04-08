import {SET_USERS_LIST} from "../actions/actionTypes";

const initialState = {
  usersList: null
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return {...state, usersList: action.usersList}
    default:
      return state
  }
}

export default usersReducer;
