'use client'
import React, { createContext, useState } from "react";

interface ContextProps{
    userLoggedIn: string,
    userId: string,
    usernameContext: string
    email: string,
    profilePic: string,
    setUserLoggedIn: (userLoggedInParam: string) => void,
    setUserId: (userIdParam: string) => void,
    setEmail: (emailParam: string) => void,
    setUsernameContext: (usernameContextParam: string) => void, 
    setProfilePic: (profilePicParam: string) => void
}


export const UserContext = createContext<ContextProps>({
    userLoggedIn: '',
    userId: '',
    usernameContext: '',
    email: '',
    profilePic: '',
    setUserLoggedIn: (): string => '',
    setUserId: (): string => '',
    setEmail: (): string => '',
    setProfilePic: (): string => '',
    setUsernameContext: (): string => ''
})

type container = {
    children: React.ReactNode
}

export function UserProvider({ children }: container ){
    var userLoggedIn = "false"
    var userId = ""
    var usernameContext = ""
    var email = ""
    var profilePic = ""

    //localstorage

    //setState functions
    const setUserLoggedIn = (userLoggedInParam: string) => {
        userLoggedIn = userLoggedInParam
        localStorage.setItem("userLoggedIn", userLoggedIn)
    }

    const setUserId = (userIdParam: string) => {
        userId = userIdParam
        localStorage.setItem("userId", userId)
    }

    const setUsernameContext = (usernameContextParam: string) => {
        usernameContext = usernameContextParam
        localStorage.setItem("usernameContext", usernameContext)
    }

    const setEmail = (emailParam: string) => {
        email = emailParam
        localStorage.setItem("email", email)
    }

    const setProfilePic = (profilePicParam: string) => {
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