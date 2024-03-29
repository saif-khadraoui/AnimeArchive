'use client'
import React, { FormEvent, ReactEventHandler, useContext, useState } from 'react'
import "./AddReviewModal.scss"
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '@/(context)/UserContext';

interface Props {
  animeId: number | undefined,
  animeTitle: string | undefined,
  setAddReviewModal: (bool: boolean)=> void
};

interface HandleNameChangeInterface {
  target: HTMLInputElement;
}

const AddReviewModal: React.FC<Props> = ({ animeId, animeTitle, setAddReviewModal }) => {
  const [guest, setGuest] = useState(true)
  const [rating, setRating] = useState<number>(0)
  const [content, setContent] = useState("")
  const { email, userId } = useContext(UserContext)
  const userLoggedIn = global?.window?.localStorage?.getItem("userLoggedIn") ? localStorage.getItem("userLoggedIn") : null
  const usernameContext = global?.window?.localStorage?.getItem("usernameContext") ? localStorage.getItem("usernameContext") : null
  const profilePic = global?.window?.localStorage?.getItem("profilePic") ? localStorage.getItem("profilePic") : null

  const addReview = async (e: FormEvent) => {
    e.preventDefault()
    // console.log(userLoggedIn)
    // console.log(usernameContext)
    // console.log(email)
    // console.log(animeId, guest, rating, content)

    const res = await fetch("/api/addReview", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          animeId,
          guest,
          username: guest ? null : usernameContext,
          userId: userId ? userId : null,
          userPic: guest ? null : profilePic,
          rating,
          content

      })
  })

    if (res.ok){
      alert("review added")
    }

  }

  const updateRating = (e: any) => {
    const val = e.target.value as number
    setRating(val)
  }

  return (
    <div className='add_review_modal'>
        <div className="top">
            <h3>Add review for {animeTitle}</h3>
            <CloseIcon sx={{color: "white", cursor: "pointer"}} onClick={(() => setAddReviewModal(false))}/>
        </div>
        <div className='options'>
          <h5>Anonymous</h5>
          {userLoggedIn == "true" ? (
            <input type='checkbox' defaultChecked={guest} onChange={((e) => setGuest(e.target.checked))}/>
          ) : (
            <>
              <input type='checkbox' checked disabled/>
              <p>Login to submit with an account</p>
            </>
            
          )
        }
        </div>
        <div className="rating">
          <h5>Rating</h5>
          <input type="range" min={0} max={10} value={rating} step={1} onChange={updateRating}/>
          <p>{rating}</p>
        </div>
        <div className='content'>
          <h5>Content</h5>
          <textarea className='text_box' value={content} onChange={((e) => setContent(e.target.value))}/>
        </div>
        <button onClick={addReview}>Add review</button>
    </div>
  )
}

export default AddReviewModal