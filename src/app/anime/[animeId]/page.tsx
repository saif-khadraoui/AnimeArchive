'use client'
import React, { useState, useEffect } from 'react'
import "./anime.scss"
import NavBar from '@/components/navbar/NavBar';
import { fetchAnimeInfo, generateRecommendations } from '@/server-actions/actions';
import openai from '@/config/openai';
import YouTube, { YouTubeProps } from 'react-youtube';
import Review from '@/components/review/Review';
import AddReviewModal from '@/components/addReviewModal/AddReviewModal';
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


interface trailer{
  youtube_id: string
}

interface anime{
  images: any,
  title: string,
  synopsis: string,
  score: number,
  episodes: number,
  trailer: trailer,
}

interface review{
  Username: string,
  Rating: number,
  Content: string,
  UserPic: string
}

interface reviews{
  review: review
}


function Anime({params}: any) {
  const [animeData, setAnimeData] = useState<anime>()
  const [addReviewModal, setAddReviewModal] = useState(false)
  const [reviews, setReviews] = useState([])
    


  useEffect(() => {
    const animeInfo = async () => {
      const data = await fetchAnimeInfo(params.animeId).then((res) => {
        setAnimeData(res.data)
      })
    }
    animeInfo()

    const loadReviews = async () => {
      const res = await fetch("/api/getReviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            animeId: params.animeId
        })
      })

      const data = await res.json()
      if (data.data.length > 0){
        setReviews(data.data)
      }
    }

    loadReviews()

  }, [])

  const getRecommendations = async () => {
    const data = await generateRecommendations();
    console.log(data)

  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const test = () => {
    console.log(reviews)
  }



  return (
    <div className="anime">
      <NavBar />
      {animeData ? (
            <div className="anime_content">
              <div className="image">
                <img src={animeData.images.jpg.image_url} />
              </div>
              <div className="information">
                <div className='anime_title'>
                  <h4>{animeData.title}</h4>
                </div>
                <div className='anime_synopsis'>
                  <p>{animeData.synopsis}</p>
                </div>
                <div className='footer'>
                  <div className='score'>
                    <p><strong>Score: </strong>{animeData.score}/10</p>
                  </div>
                  <div className='episode_count'>
                    <p><strong>Episodes: </strong>{animeData.episodes}</p>
                  </div>
                </div>
              </div>
            </div>  
      ) : (
        <div className="anime_content">
          <div className="image">
            {/* <img src={animeData.images.jpg.image_url} /> */}
            <Skeleton width={250} height={300}/>
          </div>
          <div className="information">
            <div className='anime_title'>
              {/* <h4>{animeData.title}</h4> */}
              <Skeleton width={140} height={10}/>
            </div>
            <div className='anime_synopsis'>
              {/* <p>{animeData.synopsis}</p> */}
              <Skeleton width={600} height={300}/>
            </div>
            <div className='footer'>
              <div className='score'>
                {/* <p><strong>Score: </strong>{animeData.score}/10</p> */}
                <Skeleton width={140} height={10}/>
              </div>
              <div className='episode_count'>
                {/* <p><strong>Episodes: </strong>{animeData.episodes}</p> */}
                <Skeleton width={140} height={10}/>
              </div>
            </div>
          </div>
        </div>  
      )
    
    } 
    {/* <button onClick={getRecommendations}>click</button> */}
    <div className='trailer'>
      {animeData ? (
        <YouTube videoId={animeData.trailer.youtube_id} opts={opts}/>
      ) : (
        <Skeleton width={640} height={390}/>
      )
        
      }
    </div>

    <div className='user_interaction'>
      <div className='reviews'>
        <h4><strong>Reviews</strong></h4> 
        {reviews.length > 0 ? (
            <>
            {reviews.map((review: review, idx) => {
              return (
                <Review key={idx} username={review.Username} rating={review.Rating} content={review.Content} userPic={review.UserPic} />
              )
            })}
          </>
        ) : (
          <p>There are no reviews for this anime.</p>
        )}  
        <button onClick={() => setAddReviewModal(true)}>Add review</button>

      </div>
    </div>

  {addReviewModal && <AddReviewModal animeId={params.animeId} animeTitle={animeData?.title} setAddReviewModal={setAddReviewModal} />}
  

    </div>
  )
}

export default Anime;