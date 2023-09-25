import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'
//GET (Read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById( params.id ).populate('creator')
        if(!prompt) return new Response('Prompt not Found', { status: 404})
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}

//PATCH (update)

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()
    
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) {
            return new Response('No Prompts found', { status: 404})
            
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.save()
        return new Response(existingPrompt, { status:200 })
    } catch (error) {
        return new Response('Failed to update', { status: 500 })
        
    }
}

//DELETE (delete)

export const DELETE = async (request, { params }) => {
    
    try {
       await connectToDB()
       await Prompt.findByIdAndDelete(params.id)
       
        return new Response('Prompt delete successfully', { status:200 })
        
    } catch (error) {
        return new Response('Failed to Delete', { status:500 })
    }
}