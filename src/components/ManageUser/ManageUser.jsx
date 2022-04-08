import React, {useEffect, useState} from 'react';
import './ManageUser.scss';
import Layout from "../Layout/Layout";
import ContainerHeader from "../Layout/ContainerHeader/ContainerHeader";
import {addUser, requestUsersList, updateUsersInfo} from "../../store/actions/usersAction";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import ManageUserForm from "./ManageUserForm/ManageUserForm";

const ManageUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const url = location.pathname.substr(1)
  const id = location.search.substr(4)
  const usersList = useSelector(state => state.usersReducer.usersList)
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      if (!usersList && url === 'edit') {
        await dispatch(requestUsersList())
      }
    })()
  }, [])

  useEffect(() => {
    let userEdit = null
    if (usersList) {
      userEdit = usersList.filter(el => el.id === +id)[0]
      setUser(userEdit)
    }
    if(!userEdit && usersList && usersList.length !== 0 && url === 'edit')
      navigate('/add')
  }, [usersList])

  const onSubmit = (values) => {
    if(url === 'add') {
      dispatch(addUser(values))
    } else if(url === 'edit') {
      dispatch(updateUsersInfo(id, values))
    }
    navigate(`/`)
  }

  return (
    <Layout>
      <ContainerHeader>
        Form
      </ContainerHeader>
      <div className="manageUserForms">
        {
          url === 'add'
            ? <ManageUserForm onSubmit={onSubmit}/>
            : user && <ManageUserForm onSubmit={onSubmit} user={user}/>
        }

      </div>
    </Layout>
  )
}

export default ManageUser;
