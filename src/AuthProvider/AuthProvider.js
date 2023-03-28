import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext()
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [totalCart, setTotalCart] = useState(null)
    const [searchText, setSearchText] = useState(null)
        
    const [categoryName,serCategoryName]=useState(null)
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)

    

    //sign up with email
    const signUpWithEmail = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    //sign in with email
    const signInWithEmail = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
        
    }

    //log out
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
       
    }

    //update name
    const updataName = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    //find current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoader(false)
        })

        return () => {
            return unsubscribe()
        }
    }, [])

    const authInfo = {
        setTotalCart,
        totalCart,
        signUpWithEmail,
        updataName,
        signInWithEmail,
        logOut,
        serCategoryName,
        categoryName,
        loader,
        user,
        setSearchText,
        searchText
    }
    console.log(user)
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;