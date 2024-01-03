import { NextRequest, NextResponse } from 'next/server';
import UsersModel from '../../../models/User';
import connect from '@/db/db';

export const POST = async (res) => {
    const { email, username, password, profilePic } = await res.json();
    console.log(email, username, password)
    // return new NextResponse("works")
    await connect();

    const user = new UsersModel({
        email: email,
        username: username,
        password: password,
        profilePic: profilePic
    })

    try{
        await user.save();
        return new NextResponse("user added");
    } catch(error){
        console.log(error)
        return new NextResponse("error")
    }

}
