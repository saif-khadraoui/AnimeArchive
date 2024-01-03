'use server'
import OpenAI from "openai"

console.log(process.env.OPENAI_API_KEY)
console.log("hey")

const openai = new OpenAI({
    apiKey: "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"
})



export default openai