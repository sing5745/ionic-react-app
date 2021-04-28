import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import "firbase/auth";

interface Auth {
  loggedIn: Boolean;
  userId?: string;
  userData?: any;
}
interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth {
  console.log("auth used");
  return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      const auth = firebaseUser
        ? { loggedIn: true, userId: firebaseUser.uid, userData: firebaseUser }
        : { loggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);
  return authInit;
}
