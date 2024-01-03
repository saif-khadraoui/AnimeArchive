import { NextResponse } from "next/server"


export const GET = async () => {
    const response = await fetch("https://google.com")
    const data = await response.text()
    
    return NextResponse.json({ data })
}