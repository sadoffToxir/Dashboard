import React from 'react';
import './ContainerHeader.scss';

const ContainerHeader = ({children}) => {
  return (
    <div className="containerHead">
      {children}
    </div>
  )
}

export default ContainerHeader;
