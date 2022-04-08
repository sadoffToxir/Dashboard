import React from 'react';
import './ManageUserForm.scss';
import {Button} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

const ManageUserForm = (props) => {
  const navigate = useNavigate()

  let {user} = props

  let initialValues = {
    name: user ? user.name : '',
    email: user ? user.email : '',
  }
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required(`Name is required`),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: props.onSubmit,
  });
  return (
      <form onSubmit={formik.handleSubmit}>

        <div className='manageUserForm'>
          <span className='manageUserLabel' htmlFor="name">Name</span>
          <div className="manageUserInputContainer">
            <input
              id="name"
              name="name"
              type="text"
              style={formik.touched.name && formik.errors.name
                && {borderColor: "red"}}
              className="manageUserInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='manageUserInputError'>{formik.errors.name}</div>
            ) : null}
          </div>
        </div>

        <div className='manageUserForm'>
          <span className='manageUserLabel' htmlFor="email">Email</span>
          <div className="manageUserInputContainer">
            <input
              id="email"
              name="email"
              type="email"
              style={formik.touched.name && formik.errors.name
                && {borderColor: "red"}}
              className="manageUserInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='manageUserInputError'>{formik.errors.email}</div>
            ) : null}

          </div>
        </div>

        <div className="buttons">
          <Button variant="outlined" color="error" onClick={() => navigate('/')}>Cancel</Button>
          <Button variant="contained" color="success" type="submit">Submit</Button>
        </div>
      </form>
  )
}

export default ManageUserForm;
