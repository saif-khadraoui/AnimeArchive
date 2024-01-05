import { NextRequest, NextResponse } from 'next/server';
import UsersModel from '../../../models/User';
import connect from '@/db/db';

export const POST = async (res) => {
    const { email, username, password, profilePic } = await res.json();
    console.log(email, username, password)
    // return new NextResponse("works")
    await connect();

    const checkUserExists = await UsersModel.exists({ username: username })
    const checkEmailExists = await UsersModel.exists({ email: email })
    if(checkUserExists || checkEmailExists){
        console.log("User exists")
        return NextResponse.json({ message: true })
    } else{
        console.log("User doesn't exist")
        const user = new UsersModel({
            email: email,
            username: username,
            password: password,
            profilePic: profilePic
        })

        try{
            await user.save();
            return NextResponse.json({message: false })
        } catch(error){
            console.log(error)
            return new NextResponse("error")
        }
    
    }




}
