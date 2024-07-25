import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '', username: '', name: null, profilePic: 'path/to/default-profile-pic.png' });

  const updateUser = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
