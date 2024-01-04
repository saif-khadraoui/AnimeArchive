'use client'
import React, { useContext, useEffect, useState } from 'react'
import "./Profile.scss"
import NavBar from '@/components/navbar/NavBar'
import { UserContext } from '@/(context)/UserContext'
import EditIcon from '@mui/icons-material/Edit';
import { UploadButton } from '@/utils/uploadthing'
import { OurFileRouter } from "../../api/uploadthing/core"
import { useRouter } from 'next/navigation';


function Profile() {

  const usernameContext = global?.window?.localStorage?.getItem("usernameContext") ? localStorage.getItem("usernameContext") : null
  const email = global?.window?.localStorage?.getItem("email") ? localStorage.getItem("email") : null
  const userId = global?.window?.localStorage?.getItem("userId") ? localStorage.getItem("userId") : null
  const profilePic = global?.window?.localStorage?.getItem("profilePic") ? localStorage.getItem("profilePic") : null
  // const profilePic = localStorage?.getItem("profilePic")
  console.log(profilePic)

  const { setProfilePic } = useContext(UserContext)

  const [updatedUsername, setUpdatedUsername] = useState(usernameContext)
  const [updatedEmail, setUpdatedEmail] = useState(email)
  const [updatedImagePath, setUpdatedImagePath] = useState("")
  const router = useRouter()


  const updateProfile = async() => {
    console.log(updatedImagePath)


    try{
        const res = await fetch("/api/updateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                updatedEmail,
                updatedUsername,
                updatedImagePath
                
            })
        })

        if(res.ok){
            alert("profile updated")
            setProfilePic(updatedImagePath)
        }

    } catch(error: unknown){
        console.log(error)
        
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      try{
        const res = await fetch("/api/getProfile", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              userId
              
          })
        })

        const data = await res.json()
  
        if(data){
          console.log(data.data[0].profilePic)
          setProfilePic(data.data[0].profilePic)
        } else{
          setProfilePic("")
        }
      } catch(e){
        console.log(e)
      }
    }


    getProfile()
  }, [profilePic])


  return (
    <div className='profile'>
        <NavBar />
        <div className="profile_content">
            <div className="left">
              {/* {profilePic ? (
                <img src={profilePic} alt="" />
              ) : (
                <p>Loading pfp...</p>
              )} */}
              <img src={profilePic} alt="" />
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  alert("Upload Completed");
                  setUpdatedImagePath(res[0].url)
                }} 
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
                />
            </div>
            <div className="right">
              <div className='username'>
                <h4>Username</h4>
                <input type="text"/>
              </div>
              <div className='email'>
                <h4>Email</h4>
                <input type="email" onChange={((e) => setUpdatedEmail(e.target.value))}/>
              </div>
              <div className='update_profile'>
                <button onClick={updateProfile}>Update</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Profile