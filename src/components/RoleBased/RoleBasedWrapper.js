//src\components\RoleBased\RoleBasedWrapper.js
import React from 'react';

const RoleBasedWrapper = ({ allowedRoles, children }) => {
  const role = localStorage.getItem('role');

  if (!allowedRoles.includes(role)) {
    return <div>Access Denied</div>;
  }

  return children;
};

export default RoleBasedWrapper;
