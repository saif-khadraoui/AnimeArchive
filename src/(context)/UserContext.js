'use client'
import { createContext, useState } from "react";

export const UserContext = createContext(null)

export function UserProvider({ children }){
    var userLoggedIn = "false"
    var userId = ""
    var usernameContext = ""
    var email = ""
    var profilePic = ""

    //localstorage

    //setState functions
    const setUserLoggedIn = (userLoggedInParam) => {
        userLoggedIn = userLoggedInParam
        localStorage.setItem("userLoggedIn", userLoggedIn)
    }

    const setUserId = (userIdParam) => {
        userId = userIdParam
        localStorage.setItem("userId", userId)
    }

    const setUsernameContext = (usernameContextParam) => {
        usernameContext = usernameContextParam
        localStorage.setItem("usernameContext", usernameContext)
    }

    const setEmail = (emailParam) => {
        email = emailParam
        localStorage.setItem("email", email)
    }

    const setProfilePic = (profilePicParam) => {
        profilePic = profilePicParam
        localStorage.setItem("profilePic", profilePic)
    }

    
    return (
        <UserContext.Provider value={{userId, setUserId, userLoggedIn, setUserLoggedIn, usernameContext, setUsernameContext, email, setEmail, profilePic, setProfilePic}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider