import {SET_USERS_LIST} from "./actionTypes";
import {deleteUser, getUsersList, sendNewUser, sendUpdatedUserInfo} from "../../api/usersListApi";

export const setUsersList = (usersList) => ({
  type: SET_USERS_LIST, usersList
})

export const requestUsersList = () => async (dispatch) => {
  const data = await getUsersList();
  dispatch(setUsersList(data));
}

export const requestToDeleteUser = (id) => async (dispatch, getState) => {
  const status = await deleteUser(id)
  if (status >= 200 && status < 300) {
    const usersList = getState().usersReducer.usersList
    let newData = []
    usersList.map(el => {
      if (el.id !== id) newData.push(el)
    })
    dispatch(setUsersList(newData))
  }
}

export const addUser = (data) => async (dispatch, getState) => {
  const status = await sendNewUser(data);
  if (status >= 200 && status < 300) {
    const usersList = getState().usersReducer.usersList
    if (!usersList) await requestUsersList()
    let newData = [...usersList]
    const lastElement = newData[newData.length - 1]
    newData.push({
      id: lastElement.id + 1,
      name: data.name,
      username: data.name,
      email: data.email,
      address: {
        city: 'City',
        geo: {lat: '', lng: ''},
        street: '',
        suite: '',
        zipcode: ''
      },
      company: {bs: '', catchPhrase: '', name: ''},
      phone: '',
      website: ''
    })
    dispatch(setUsersList(newData))
  }
}

export const updateUsersInfo = (id, data) => async (dispatch, getState) => {
  const usersList = getState().usersReducer.usersList
  const user = usersList.filter(el => el.id === +id)[0]
  user.name = data.name
  user.email = data.email
  const status = await sendUpdatedUserInfo(user)
  if (status >= 200 && status < 300) {
    let newData = []
    usersList.map(el => {
      if (el.id === +id)
        newData.push(user)
      else
        newData.push(el)
    })
    dispatch(setUsersList(newData))
  }
}
