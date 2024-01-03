import connect from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';
import ReviewsModel from './../../../models/Reviews';
import { ConstructionOutlined } from '@mui/icons-material';

export const POST = async (req) => {
    const {animeId, guest, username, userId, userPic, rating, content} = await req.json()
    console.log(animeId, guest, username, userId, userPic, rating, content)

    await connect()

    const review = new ReviewsModel({
        AnimeId: animeId,
        Guest: guest,
        Username: username,
        UserId: userId,
        UserPic: userPic,
        Rating: rating,
        Content: content
    })

    try{
        await review.save()
        return new NextResponse("review added")
    } catch(e){
        console.log(e)
        return new NextResponse(e)
    }

    return new NextResponse("works")
}