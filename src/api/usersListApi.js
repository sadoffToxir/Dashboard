import axiosInstance from "./axios";

export const getUsersList = () => {
  return axiosInstance.get('').then(res => res.data)
}
export const deleteUser = (id) => {
  return axiosInstance.delete(`/${id}`).then(res => res.status)
}

export const sendNewUser = (data) => {
  return axiosInstance.post('', data).then(res => res.status)
}

export const sendUpdatedUserInfo = (data) => {
  console.log(data)
  return axiosInstance.put(`/${data.id}`, data).then(res => res.status)
}
