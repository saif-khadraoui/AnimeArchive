'use client'
import React from 'react'
import "./Review.scss"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

interface review{
    username: string,
    rating: number,
    content: string
    userPic: string
}

const Review: React.FC<review> = ({ username, rating, content, userPic }) => {
  return (
    <div className='review'>
        <div className='top'>
        <div className='left'>
            {userPic ? (
                <img src={userPic} alt="" />
            ) : (
                <PersonOutlineIcon />
            )}
            <div className='right'>
                {username ? (
                    <p>{username}</p>
                ) : (
                    <p>Anonymous</p>
                )}
                <p>{rating}/10</p>
            </div>
        </div>
        <div className='right'>
            <p>28/12/2023</p>
        </div>
        </div>
        <div className='bottom'>
            <p>{content}</p>
        </div>
    </div>
  )
}

export default Review