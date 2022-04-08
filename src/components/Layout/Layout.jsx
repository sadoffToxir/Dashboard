import React from 'react';
import './Layout.scss';
import Header from "../Header/Header";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

const Layout = ({children}) => {
  return (
    <div className='wrapper'>
      <Header/>
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default Layout;
