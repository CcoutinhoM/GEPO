import Servicos from "../../../../models/servicos";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        console.log(params.id)

        const prompts = await Servicos.find({ creator: params.id }).populate("creator")
        console.log(prompts)
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 