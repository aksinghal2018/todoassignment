import React, { useEffect } from 'react';
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
function Logoutcmp() {
    useEffect(() => {
      encryptStorage.removeItem("user")
      window.location.replace("/login")
    }, []);
    
  return <div></div>;
}

export default Logoutcmp;
