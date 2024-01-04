import { createContext, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updatePassword} from 'firebase/auth'
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDa8BEdqlO1Pt9WIXIXA2Xo58qmtbe5InM",
    authDomain: "asssistencia-2023.firebaseapp.com",
    databaseURL: "https://asssistencia-2023-default-rtdb.firebaseio.com",
    projectId: "asssistencia-2023",
    storageBucket: "asssistencia-2023.appspot.com",
    messagingSenderId: "312564370922",
    appId: "1:312564370922:web:fda99435586b629dd7b693",
    measurementId: "G-2HQY8Y1PDD"
});

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const auth = getAuth(firebaseApp);   
    const db = getFirestore(firebaseApp);

    const [currentUser, setCurrentUser] = useState(null);
    const [curUserName, setCurUserName] = useState(null);
    const [curUserType, setCurUserType] = useState(null);

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const changePassword = (newPassword) => {
        return updatePassword(currentUser, newPassword);
    };

    const logout = () => {
        return signOut(auth);
    };

    const getUserInformations = async(userUid) => {
        let userProperties = (await getDoc(doc(db, 'usersProperties', userUid))).data();
        setCurUserName(userProperties.displayName);
        setCurUserType(userProperties.userType);
    }

    useEffect (() => {
        onAuthStateChanged(auth, (curUser) => {
            if(curUser){
                setCurrentUser(curUser);
                getUserInformations(curUser.uid);
            }
            else{
                setCurrentUser(null);
            }
            
        });
    }, [onAuthStateChanged]);

   return (
    <UserContext.Provider value={{currentUser, signIn, logout, curUserName, curUserType, changePassword}}>
        {children}
    </UserContext.Provider>
    );
}